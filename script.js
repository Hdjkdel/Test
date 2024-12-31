// API Key ve BSC RPC URL
const API_KEY = "Z79MRWY1J4INJ2E8TYZAZS6TTI6ZQTKGAD";
const BSC_RPC = `https://bsc-dataseed.binance.org/`;

// Web3.js ve Ethers.js kütüphanelerini kullanıyoruz
const web3 = new Web3(BSC_RPC);  // Web3.js ile BSC bağlantısı
const ethersProvider = new ethers.JsonRpcProvider(BSC_RPC);  // Ethers.js ile BSC bağlantısı

// Seed kelimeleri oluşturmak için kullanılacak fonksiyon
function generateSeed() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    document.getElementById('seed-words').textContent = mnemonic; // Seed kelimelerini ekrana yazıyoruz
    return mnemonic;
}

// BNB adresi oluşturmak ve bakiyeyi sorgulamak için fonksiyon
async function generateAddressAndCheckBalance(seed) {
    try {
        // Yükleniyor mesajını göster
        document.getElementById('bnb-address').textContent = "Yükleniyor...";

        const wallet = ethers.Wallet.fromMnemonic(seed);  // Seed kelimelerinden cüzdan oluşturuluyor
        const address = wallet.address;

        // Adresi HTML'de gösteriyoruz
        document.getElementById('bnb-address').textContent = address;

        // Web3.js ile BNB bakiyesini sorgulama
        const balanceWei = await web3.eth.getBalance(address);
        const balance = web3.utils.fromWei(balanceWei, 'ether');
        
        // Bakiyeyi HTML'de gösteriyoruz
        document.getElementById('balance').textContent = balance;

        // Eğer bakiye varsa, taramayı durdur
        if (parseFloat(balance) > 0) {
            clearInterval(scanInterval);  // Bakiye bulunduğunda taramayı durdur
        }
    } catch (error) {
        console.error("Hata oluştu: ", error);
        document.getElementById('bnb-address').textContent = "Hata oluştu";
    }
}

// Tarama işlemini başlatan fonksiyon
function startScanning() {
    let scanInterval = setInterval(() => {
        const seed = generateSeed();  // Seed kelimesini oluştur
        generateAddressAndCheckBalance(seed);  // Adresi oluştur ve bakiyeyi kontrol et
    }, 1000);  // Her 1 saniyede bir tarama yap
}

// Uygulama otomatik başlasın
startScanning();