// Binance Smart Chain RPC
const BSC_RPC = "https://bsc-dataseed.binance.org/";
const web3 = new Web3(BSC_RPC);

// Rastgele Seed Kelimeleri (BIP-39 ile)
function generateSeedWords() {
    return bip39.generateMnemonic();
}

// Seed'den BNB Adresi Oluşturma
function deriveAddressFromSeed(seed) {
    // Seed'den Private Key oluştur
    const seedBuffer = bip39.mnemonicToSeedSync(seed);
    const account = web3.eth.accounts.privateKeyToAccount(
        "0x" + seedBuffer.toString("hex").slice(0, 64)
    );
    return account;
}

// Cüzdan Oluştur ve Adresi Sorgula
async function generateWallet() {
    try {
        // 1. Seed Kelimelerini Oluştur
        const seedWords = generateSeedWords();
        document.getElementById("seed-words").innerText = seedWords;

        // 2. Seed'den Adres ve Private Key Türet
        const account = deriveAddressFromSeed(seedWords);
        const bnbAddress = account.address;

        // 3. Adresi Göster
        document.getElementById("bnb-address").innerText = bnbAddress;

        // 4. Adresin Bakiyesini Sorgula
        const balance = await web3.eth.getBalance(bnbAddress);
        const formattedBalance = web3.utils.fromWei(balance, "ether");
        document.getElementById("balance").innerText = `${formattedBalance} BNB`;

        // Eğer bakiye > 0 ise işlemi durdur
        if (parseFloat(formattedBalance) > 0) {
            alert(`Bakiye bulundu: ${formattedBalance} BNB`);
        } else {
            // Tarama işlemini tekrar başlat
            setTimeout(generateWallet, 1000);
        }
    } catch (error) {
        console.error("Hata:", error);
        document.getElementById("bnb-address").innerText = "Hata oluştu!";
    }
}

// Başlat
generateWallet();
