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

// Função para gerar o QR Code
function generateQRCode(etiquetas) {
    // Obter os valores selecionados de cada select
    const product = document.getElementById("product-select").value;
    const color = document.getElementById("color-select").value;
    const bias = document.getElementById("bias-select").value;
    const size = document.getElementById("size-select").value;

    // Concatenar os valores dos selects
    const concatenatedValues = `${product}.${color}.${bias}.${size}`;

    // Criar a URL para o QR Code com os valores concatenados
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=3000x3000&ecc=Q&data=${encodeURIComponent(concatenatedValues)}`;


    const listaQrcode = document.getElementById("qr-code");

    listaQrcode.innerHTML = '';

    // Atualizar a imagem do QR Code
    if (etiquetas <= 2){
        for (let x = 1; x <= etiquetas; x++) {

            let img1 = document.createElement("img");
            img1.classList.add('qr-img');
            img1.src = qrCodeUrl;

            listaQrcode.appendChild(img1);

        }
    }else{
        for (let x = 2; x <= etiquetas; x+=2) {

            let img1 = document.createElement("img");
            img1.classList.add('qr-img');
            img1.src = qrCodeUrl;

            let qrcode2 = document.createElement("div");
            qrcode2.classList.add("qr-code2");

            qrcode2.appendChild(img1);
            qrcode2.appendChild(img1.cloneNode(true));
            listaQrcode.appendChild(qrcode2);


        }
    }
    showCenteredMessage();

}

 // Cria o elemento de mensagem quando o qrcode for gerado
function showCenteredMessage() {

    const messageDiv = document.createElement("div");
    messageDiv.innerText = "QR Code Gerado";
    
    // Estilo para centralizar e colocar o elemento por cima de tudo
    Object.assign(messageDiv.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgb(3,253,25)",
        color: "black",
        fontWeight: "700",
        padding: "50px",
        borderRadius: "8px",
        fontSize: "1.5em",
        textAlign: "center",
        zIndex: "9999" // garante que o elemento fique por cima de outros elementos
    });
    
    // Adiciona o elemento ao corpo do documento
    document.body.appendChild(messageDiv);
    
    // Remove o elemento após 2000 ms
    setTimeout(() => {
        messageDiv.remove();
    }, 1000);
}





window.onload = function() {
    pesquisar();
};