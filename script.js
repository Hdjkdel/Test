// Binance Smart Chain RPC URL ve Web3.js bağlantısı
const BSC_RPC = "https://bsc-dataseed.binance.org/";
const web3 = new Web3(BSC_RPC);

// Tarama başlatma fonksiyonu
async function startScan() {
    try {
        // Seed kelimelerini oluştur
        const wallet = ethers.Wallet.createRandom();
        const seed = wallet.mnemonic.phrase;
        const address = wallet.address;

        // Seed kelimeleri ve adresi ekrana yazdır
        document.getElementById('seed-words').textContent = seed;
        document.getElementById('bnb-address').textContent = address;

        // Adresin BNB bakiyesini sorgula
        const balanceWei = await web3.eth.getBalance(address);
        const balance = web3.utils.fromWei(balanceWei, 'ether');

        // Bakiye ekrana yazdır
        document.getElementById('balance').textContent = `${balance} BNB`;

        // Eğer bakiye sıfır değilse taramayı durdur
        if (parseFloat(balance) > 0) {
            alert(`Bakiye Bulundu: ${balance} BNB`);
        } else {
            console.log("Bakiye bulunamadı, taramaya devam ediliyor...");
            startScan(); // Tekrar tarama yap
        }
    } catch (error) {
        console.error("Hata oluştu:", error);
        alert("Bir hata meydana geldi.");
    }
}

// Butona tıklanınca taramayı başlat
document.getElementById('start-scan').addEventListener('click', startScan);
