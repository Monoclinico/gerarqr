
// Função para gerar o QR Code
function generateQRCode() {
    // Obter os valores selecionados de cada select
    const product = document.getElementById("product-select").value;
    const color = document.getElementById("color-select").value;
    const bias = document.getElementById("bias-select").value;
    const size = document.getElementById("size-select").value;

    // Concatenar os valores dos selects
    const concatenatedValues = `${product}.${color}.${bias}.${size}`;

    // Criar a URL para o QR Code com os valores concatenados
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=3000x3000&ecc=Q&data=${encodeURIComponent(concatenatedValues)}`;

    // Atualizar a imagem do QR Code
    const qrImage = document.getElementsByClassName("qr-img");
    qrImage[0].src = qrCodeUrl;

}


// Preencher os selects ao carregar a página
window.onload = function() {
    pesquisar();
};