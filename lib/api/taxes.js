import { fetchAPI, putAPI, postAPI } from './api';

export async function getTaxes() {
    const response = await fetchAPI(`taxes`);
    return response;
}

export async function getTaxRuleGroups(idTaxRuleGroups) {
    const response = await fetchAPI(`tax_rule_groups/${idTaxRuleGroups}`);
    return response.tax_rule_group;
}
