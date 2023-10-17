type DomainType = "all" | "off" | "com" | "edu" | "fin" | "hea" | "etc";

interface Domain {
  domain: DomainType;
  domainKR: string;
}

const DOMAIN_MAP: Record<DomainType, string> = {
  all: "전체",
  off: "오피스",
  com: "커머스",
  edu: "에듀",
  fin: "핀테크",
  hea: "헬스케어",
  etc: "기타"
};

const DOMAIN_LIST: Domain[] = Object.entries(DOMAIN_MAP).map(
  ([domain, domainKR]) => ({
    domain: domain as DomainType,
    domainKR
  })
);

export type { DomainType, Domain };
export default DOMAIN_LIST;
