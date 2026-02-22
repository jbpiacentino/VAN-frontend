import {
  buildMembershipMap,
  mapVendor,
  relationFirst,
  relationItems,
  strapiFetchAll,
} from '../../utils/strapi';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    const query = getQuery(event);
    const debug =
      String(query.debug || query._debug || '')
        .trim()
        .toLowerCase() === '1' ||
      String(query.debug || query._debug || '')
        .trim()
        .toLowerCase() === 'true';
    if (!slug) {
      throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
    }

    const vendorRows = await strapiFetchAll('vendors', {
      populate: '*',
      'filters[slug][$eq]': slug,
      'pagination[pageSize]': 1,
    });

    const rawVendor = vendorRows[0];
    if (!rawVendor) {
      throw createError({ statusCode: 404, statusMessage: 'Vendor not found' });
    }

    const membershipRows = await strapiFetchAll('VAN-members', {
      populate: '*',
      'filters[vendor][slug][$eq]': slug,
      'pagination[pageSize]': 5,
    });

    const vendor = mapVendor(rawVendor, buildMembershipMap(membershipRows));

    // Derive solution ownership from solutions collection to avoid inconsistent relation shapes on vendors.
    const allSolutions = await strapiFetchAll('solutions', {
      populate: '*',
      'pagination[pageSize]': 200,
    });
    const ownedSolutions = allSolutions.filter(
      (solution: any) => String(relationFirst(solution?.vendor)?.slug || '') === slug
    );
    const solutionIds = ownedSolutions
      .map((solution: any) => String(solution?.documentId || ''))
      .filter(Boolean);

    const briefsParams: Record<string, any> = {
      populate: '*',
      'sort[0]': 'title:asc',
      'pagination[pageSize]': 200,
    };
    const guidesParams: Record<string, any> = {
      populate: '*',
      'sort[0]': 'title:asc',
      'pagination[pageSize]': 200,
    };
    const kbParams: Record<string, any> = {
      populate: '*',
      'sort[0]': 'title:asc',
      'pagination[pageSize]': 200,
    };

    const [briefsRows, guidesRows, kbRows] = solutionIds.length
      ? await Promise.all([
          strapiFetchAll('solution-briefs', briefsParams),
          strapiFetchAll('solution-guides', guidesParams),
          strapiFetchAll('kb-articles', kbParams),
        ])
      : [[], [], []];
    const solutionIdSet = new Set(solutionIds);
    const briefFilteredRaw = briefsRows.filter((row: any) =>
      relationItems(row?.solution).some((rel) => solutionIdSet.has(String(rel?.documentId || '')))
    );
    const guideFilteredRaw = guidesRows.filter((row: any) =>
      relationItems(row?.solutions).some((rel) => solutionIdSet.has(String(rel?.documentId || '')))
    );
    const kbFiltered = kbRows.filter((row: any) => {
      const one = relationItems(row?.solution);
      const many = relationItems(row?.solutions);
      return [...one, ...many].some((rel: any) =>
        solutionIdSet.has(String(rel?.documentId || ''))
      );
    });
    const briefFiltered = vendor.isVanMember ? briefFilteredRaw : [];
    const guideFiltered = vendor.isVanMember ? guideFilteredRaw : [];

    if (debug) {
      const debugPayload = {
        slug,
        vendorDocumentId: vendor.documentId,
        vendorName: vendor.name,
        solutionIds,
        sourceCounts: {
          allSolutions: allSolutions.length,
          allBriefs: briefsRows.length,
          allGuides: guidesRows.length,
          allKb: kbRows.length,
        },
        matchedCounts: {
          briefs: briefFiltered.length,
          guides: guideFiltered.length,
          kb: kbFiltered.length,
        },
        matched: {
          briefs: briefFiltered.map((row: any) => ({
            title: row.title,
            briefDocumentId: row.documentId,
            linkedSolutionIds: relationItems(row?.solution).map((rel: any) => rel?.documentId),
          })),
          guides: guideFiltered.map((row: any) => ({
            title: row.title,
            guideDocumentId: row.documentId,
            linkedSolutionIds: relationItems(row?.solutions).map((rel: any) => rel?.documentId),
          })),
          kb: kbFiltered.map((row: any) => ({
            title: row.title,
            kbDocumentId: row.documentId,
            linkedSolutionIds: [
              ...relationItems(row?.solution).map((rel: any) => rel?.documentId),
              ...relationItems(row?.solutions).map((rel: any) => rel?.documentId),
            ],
          })),
        },
      };
      console.log('[vendor-debug]', JSON.stringify(debugPayload));
    }

    const response = {
      vendor: {
        ...vendor,
        solutions: ownedSolutions.map((solution: any) => ({
          id: solution.id,
          documentId: solution.documentId,
          slug: solution.slug,
          name: solution.name || solution.title,
          shortDescription: solution.short_description,
          workflow: solution.workflow,
        })),
      },
      briefs: briefFiltered.map((row: any) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        shortDescription: row.short_description,
        description: row.description,
      })),
      guides: guideFiltered.map((row: any) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        summary: row.summary,
      })),
      kbArticles: kbFiltered.map((row: any) => ({
        id: row.id,
        documentId: row.documentId,
        slug: row.slug,
        title: row.title,
        type: row.type,
      })),
    };
    if (debug) {
      Object.assign(response, {
        _debug: {
          slug,
          solutionIds,
          sourceCounts: {
            allSolutions: allSolutions.length,
            allBriefs: briefsRows.length,
            allGuides: guidesRows.length,
            allKb: kbRows.length,
          },
          matchedCounts: {
            briefs: briefFiltered.length,
            guides: guideFiltered.length,
            kb: kbFiltered.length,
          },
        },
      });
    }
    return response;
});
