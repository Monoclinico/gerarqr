 const spreadsheetID = '1oOt67kGeoizOmVk_BPy9Rv5WNWApcJNX_JWeOMyXBsM';

const planilhaID = "0";

const urldados = `https://docs.google.com/spreadsheets/d/${spreadsheetID}/gviz/tq?tqx=out:json&tq&gid=${planilhaID}`;


let produto_obj = {};
let cor_obj = {};
let detalhe_obj = {};
let tamanho_obj = {};


async function obterDados(link){

    let data = await fetch(link);
    let texto1 = await data.text()
    let texto2 = texto1.replaceAll(
        "/*O_o*/\ngoogle.visualization.Query.setResponse(",
        ""
    );    
    let texto3 = texto2.replace(
        ");",
        ""
    );

    return JSON.parse(texto3);
}


function pesquisar(){
    

    obterDados(urldados).then(
        value => {


            let tabela = value.table.rows;

            let filtro = tabela.map((k) =>{
                return k['c'];
            });

        

            for (let chave in filtro) {

                if(filtro[chave][0] != null && filtro[chave][1] != null){
                    if(filtro[chave][0].v != null && filtro[chave][1].v != null){
                        produto_obj[filtro[chave][1].v.toString()] = filtro[chave][0].v.toString();
                    }
                }

                if(filtro[chave][2] != null && filtro[chave][3] != null){
                    if(filtro[chave][2].v != null && filtro[chave][3].v != null){
                        cor_obj[filtro[chave][3].v.toString()] = filtro[chave][2].v.toString();
                    }
                }

                if(filtro[chave][4] != null && filtro[chave][5] != null){
                    if(filtro[chave][4].v != null && filtro[chave][5].v != null){
                        detalhe_obj[filtro[chave][5].v.toString()] = filtro[chave][4].v.toString();
                    }
                }

                if(filtro[chave][6] != null && filtro[chave][7] != null){
                    if(filtro[chave][6].v != null && filtro[chave][7].v != null){
                        tamanho_obj[filtro[chave][7].v.toString()] = filtro[chave][6].v.toString();
                    }
                }

            }

           

            populateSelect("product-select", produto_obj);
            populateSelect("color-select", cor_obj);
            populateSelect("bias-select", detalhe_obj);
            populateSelect("size-select", tamanho_obj);

            
        }
    ).catch(
        value => {

            // se erro
            console.log(value);
        
        }
    )
}

// Função para preencher os selects dinamicamente
function populateSelect(selectId, obj) {
    const select = document.getElementById(selectId);
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const option = document.createElement("option");
            option.value = key; // A chave será o valor da opção
            option.textContent = obj[key]; // O valor será o texto
            select.appendChild(option);
        }
    }
}

// Função para imprimir o QR Code
function printQRCode() {
    // Imprimir apenas a área do QR Code
    window.print();
}