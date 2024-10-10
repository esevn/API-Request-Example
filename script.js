var question = document.getElementById("question");
var answer = document.getElementById("answer");
var loading = document.getElementById("loading"); // Mengambil elemen loading

var apiURL = "https://widipe.com/openai"; // URL API

async function sendRequest() {
     // Cek apakah input kosong
     if (question.value.trim() === "") {
        answer.innerHTML = "APA YANG KAMU KIRIMKAN?😑"; // Tampilkan pesan kesalahan
        return; // Hentikan proses jika input kosong
    }

    try {
        // Tampilkan animasi loading
        loading.classList.remove("hidden");
        answer.innerHTML = ""; // Kosongkan jawaban sebelumnya

        const url = `${apiURL}?text=${encodeURIComponent(question.value)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const data = await response.json();
        var htmlContent = renderApiResult(data.result);
        answer.innerHTML = htmlContent; // Tampilkan hasil

    } catch (error) {
        console.log(error.message);
    } finally {
        // Sembunyikan animasi loading
        loading.classList.add("hidden");

        // Kosongkan input setelah tombol ditekan dan API diproses
        question.value = "";
    }
    
};


function renderApiResult(result) {
    // Pisahkan teks berdasarkan blok kode dan teks lainnya
    let formattedHtml = result
      .replace(/```html([^`]+)```/g, '<pre><code>$1</code></pre>') // Mengubah blok kode menjadi <pre><code>
      .replace(/### (.+)/g, '<h3>$1</h3>') // Mengubah heading menjadi <h3>
      .replace(/\n/g, '<br>') // Mengganti line break dengan <br>
      .replace(/\- (.+)/g, '<li>$1</li>') // Mengganti bullet point dengan <li>
      .replace(/(\n\n)/g, '</p><p>') // Memisahkan paragraf
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Tambahkan wrapper <p> di awal dan akhir
    return `<p>${formattedHtml}</p>`;
  }