const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    
    if(url === '') {
        alert('Please enter url')
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQrCode(url, size);

            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveButton(saveUrl);
            }, 50);
        }, 500);
    }
    
};

const generateQrCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        height: size,
        width: size
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};
const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';
    const save = document.getElementById('saveLink');
    if(save) save.remove();
};

const createSaveButton = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'saveLink';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generate').appendChild(link); 

}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);