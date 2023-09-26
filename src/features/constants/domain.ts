type DomainType = "all" | "off" | "com" | "edu" | "fin" | "hea" | "etc";
const DOMAIN_LIST: { domain: DomainType; domainKR: string }[] = [
  {
    domain: "all",
    domainKR: "전체",
  },
  {
    domain: "off",
    domainKR: "오피스",
  },
  {
    domain: "com",
    domainKR: "커머스",
  },
  {
    domain: "edu",
    domainKR: "에듀",
  },
  {
    domain: "fin",
    domainKR: "핀테크",
  },
  {
    domain: "hea",
    domainKR: "헬스케어",
  },
  {
    domain: "etc",
    domainKR: "기타",
  },
];

export default DOMAIN_LIST;
