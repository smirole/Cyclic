var page = 1;
const perPage = 8;

let companyObjectToTableRowTemplate = company => (
        `<tr data-id=${company._id}>
            <td>${company.name}</td>
            <td>${company.description}</td>
            <td>${company.number_of_employees}</td>
            <td>${company.offices[0] ? company.offices[0].city : '--'}, ${company.offices[0] ? company.offices[0].state_code : '--'}, ${company.offices[0] ? company.offices[0].country : '--'}</td>
            <td>${company.category_code}</td>
            <td>${company.founded_month}/${company.founded_day}/${company.founded_year}</td>
            <td>${company.homepage_url}</td>
            <td>${company.tag_list[0]}, ${company.tag_list[1]}</td>
        </tr>`)

function loadCompanyData(name = null) {
    console.log('loadCompanyData is called');
    let url = ""
    const div = document.getElementsByClassName("pagination");
    if (name != null) {
        url = `api/companies?page=${+page}&perPage=${+perPage}&name=${name}`
        div[0].classList.add("d-none");
    } else {
        url = `api/companies?page=${+page}&perPage=${+perPage}`
        div[0].classList.remove("d-none");
    }
    console.log(url)

    fetch(url).then(res => res.json()).then(data => {    
        console.log("TEST TEST TEST2")
        let companyRows = `
        ${data.map(company => companyObjectToTableRowTemplate(company)).join('')}
        `;

        document.querySelector('#companyTable tbody').innerHTML = companyRows;
    });
}


document.addEventListener('DOMContentLoaded', function () {
    console.log('Adding event listener');
    loadCompanyData();
});
