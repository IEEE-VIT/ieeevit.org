const makeDomain = (domain_name, domain_icon) => {
  const domain_text = document.createElement("div");
  domain_text.classList.add("domain-text");
  domain_text.appendChild(document.createTextNode(domain_name));

  const img = document.createElement("img");
  img.src = `./images/domains/${domain_icon}`;
  img.alt = domain_name;
  img.classList.add("domain-icon");

  const domain = document.createElement("div");
  domain.classList.add("domain");
  domain.appendChild(img);
  domain.appendChild(domain_text);

  return domain;
};

const fillDomains = (domains) => {
  const container = document.querySelector(".domains");

  domains.forEach((domain) => {
    let { domain_name, domain_icon } = domain;
    const domain_element = makeDomain(domain_name, domain_icon);
    container.appendChild(domain_element);
  });
};

const addDomains = async () => {
  const response = await fetch("../data.json");
  const data = await response.json();

  fillDomains(data.domains);
};

addDomains();
