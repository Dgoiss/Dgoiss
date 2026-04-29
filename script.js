document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('song-modal');
    const closeBtn = document.querySelector('.close-modal');
    const cards = document.querySelectorAll('.song-card');

    // Modal elements
    const modalTitle = document.getElementById('modal-title');
    const modalArtist = document.getElementById('modal-artist');
    const modalQuote = document.getElementById('modal-quote');
    const modalAlbum = document.getElementById('modal-album');
    const modalYear = document.getElementById('modal-year');
    const modalSpotify = document.querySelector('.modal-spotify');

    cards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').innerText;
            const quote = card.querySelector('.song-quote').innerText;
            const meta = card.querySelector('.song-meta').innerText;
            const spotifySrc = card.querySelector('iframe').src;
            const artistName = card.closest('.artist-section').querySelector('.section-title').innerText;

            // Extrair álbum e ano do meta (Ex: Paul McCartney • Revolver • 1966)
            const metaParts = meta.split('•').map(p => p.trim());
            const album = metaParts[1] || 'N/A';
            const year = metaParts[2] || 'N/A';

            // Atualizar modal
            modalTitle.innerText = title;
            modalArtist.innerText = artistName;
            modalQuote.innerText = quote;
            modalAlbum.innerText = album;
            modalYear.innerText = year;
            
            // Injetar o player no modal com altura total (352px)
            modalSpotify.innerHTML = `<iframe src="${spotifySrc}" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;

            // Definir cor de destaque do modal baseada no artista
            const accentColor = getComputedStyle(card.closest('.artist-section')).getPropertyValue('--accent');
            document.documentElement.style.setProperty('--modal-accent', accentColor);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Impedir scroll do fundo
        });
    });

    // Fechar modal
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalSpotify.innerHTML = ''; // Parar a música ao fechar
    };

    closeBtn.addEventListener('click', closeModal);
    
    // Fechar ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar com ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
