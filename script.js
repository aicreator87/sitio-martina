// Configuración de la fecha del evento
const eventDate = new Date('2025-12-14T13:00:00').getTime();

// Elementos del DOM
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

const modal = document.getElementById('confirmationModal');
const confirmBtn = document.getElementById('confirmBtn');
const closeModal = document.getElementById('closeModal');
const confirmationForm = document.getElementById('confirmationForm');
const successMessage = document.getElementById('successMessage');
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

// Estado de la música
let isMusicPlaying = false;

// Función para actualizar el contador regresivo
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Actualizar elementos con animación
        updateCountdownElement(countdownElements.days, days);
        updateCountdownElement(countdownElements.hours, hours);
        updateCountdownElement(countdownElements.minutes, minutes);
        updateCountdownElement(countdownElements.seconds, seconds);
    } else {
        // El evento ha comenzado
        countdownElements.days.textContent = '00';
        countdownElements.hours.textContent = '00';
        countdownElements.minutes.textContent = '00';
        countdownElements.seconds.textContent = '00';
        
        // Cambiar el título de la sección
        document.querySelector('.countdown-section .section-title').textContent = '¡Te espero!';
    }
}

// Función para actualizar un elemento del contador con animación
function updateCountdownElement(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    if (element.textContent !== formattedValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ffd700';
        setTimeout(() => {
            element.textContent = formattedValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#d4af37';
        }, 150);
    }
}

// Función para controlar la música
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-volume-off"></i>';
        isMusicPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Error al reproducir música:', error);
        });
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        isMusicPlaying = true;
    }
}

// Función para actualizar el ícono de música según el estado
function updateMusicIcon() {
    if (isMusicPlaying) {
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        musicToggle.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
}

// Función para mostrar mensaje de éxito en formularios
function showFormSuccess(messageId) {
    const messageElement = document.getElementById(messageId);
    const form = messageElement.closest('.modal-content').querySelector('form');
    
    // Ocultar formulario y mostrar mensaje
    form.style.display = 'none';
    messageElement.style.display = 'block';
    messageElement.classList.add('success');
    
    // Auto-cerrar modal después de 3 segundos
    setTimeout(() => {
        const modal = messageElement.closest('.modal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Restaurar formulario para futuros usos
        setTimeout(() => {
            form.style.display = 'block';
            messageElement.style.display = 'none';
            messageElement.classList.remove('success');
        }, 500);
    }, 3000);
}

// Función para mostrar mensaje de error en formularios
function showFormError(messageId, customMessage = null) {
    const messageElement = document.getElementById(messageId);
    const form = messageElement.closest('.modal-content').querySelector('form');
    
    // Actualizar mensaje si se proporciona uno personalizado
    if (customMessage) {
        const messageText = messageElement.querySelector('p');
        messageText.textContent = customMessage;
    }
    
    // Mostrar mensaje de error
    messageElement.style.display = 'block';
    messageElement.classList.add('error');
    
    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        messageElement.style.display = 'none';
        messageElement.classList.remove('error');
    }, 5000);
}

// Función para abrir el modal
function openModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Animación de entrada
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 10);
}

// Función para cerrar el modal
function closeModalFunction() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    confirmationForm.reset();
}





// Función para enviar datos al servidor (opcional)
function sendToServer(data) {
    // Ejemplo de envío a un servidor
    fetch('/api/confirmations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Confirmación enviada:', result);
    })
    .catch(error => {
        console.error('Error al enviar confirmación:', error);
    });
}

// Función para validar DNI argentino
function validateDNI(dni) {
    const dniRegex = /^\d{7,8}$/;
    return dniRegex.test(dni.replace(/\./g, ''));
}

// Función para formatear DNI mientras se escribe
function formatDNI(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) {
        value = value.substring(0, 8);
    }
    
    // Formatear con puntos
    if (value.length > 6) {
        value = value.substring(0, 2) + '.' + value.substring(2, 5) + '.' + value.substring(5);
    } else if (value.length > 3) {
        value = value.substring(0, 2) + '.' + value.substring(2);
    }
    
    input.value = value;
}

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.detail-item, .time-unit, .gallery-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Función para inicializar animaciones
function initAnimations() {
    const elements = document.querySelectorAll('.detail-item, .time-unit, .gallery-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
}

// Función para manejar el scroll suave
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar contador regresivo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Inicializar animaciones
    initAnimations();
    
    // Control de música
    musicToggle.addEventListener('click', toggleMusic);
    
    // Inicializar con ícono de música tachada (apagada)
    isMusicPlaying = false;
    updateMusicIcon();
    
    // Intentar reproducir música automáticamente
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicIcon();
    }).catch(error => {
        console.log('Reproducción automática bloqueada:', error);
        // Mantener el ícono de música tachada
    });
    
    // Modal de confirmación
    confirmBtn.addEventListener('click', openModal);
    closeModal.addEventListener('click', closeModalFunction);
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunction();
        }
    });
    
    // Manejar envío del formulario de confirmación
    confirmationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar campos requeridos
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const dni = document.getElementById('dni').value.trim();
        
        if (!firstName || !lastName || !dni) {
            showFormError('confirmationError', 'Por favor, completa todos los campos requeridos.');
            return;
        }
        
        // Generar asunto dinámicamente
        const subject = `Confirmo Asistencia - ${firstName}_${lastName}`;
        document.getElementById('confirmationSubject').value = subject;
        
        // Convertir valores de checkboxes a español
        const parkingCheckbox = document.getElementById('parking');
        const familyGroupCheckbox = document.getElementById('familyGroup');
        
        // Crear campos ocultos para los valores en español
        let parkingHidden = document.getElementById('parkingHidden');
        let familyGroupHidden = document.getElementById('familyGroupHidden');
        
        // Si no existen, crearlos
        if (!parkingHidden) {
            parkingHidden = document.createElement('input');
            parkingHidden.type = 'hidden';
            parkingHidden.name = 'estacionamiento_texto';
            confirmationForm.appendChild(parkingHidden);
        }
        
        if (!familyGroupHidden) {
            familyGroupHidden = document.createElement('input');
            familyGroupHidden.type = 'hidden';
            familyGroupHidden.name = 'grupo_familiar_texto';
            confirmationForm.appendChild(familyGroupHidden);
        }
        
        // Asignar valores en español
        parkingHidden.value = parkingCheckbox.checked ? 'Sí' : 'No';
        familyGroupHidden.value = familyGroupCheckbox.checked ? 'Sí' : 'No';
        
        // Crear campo oculto para resumen de confirmación
        let resumenHidden = document.getElementById('resumenHidden');
        if (!resumenHidden) {
            resumenHidden = document.createElement('input');
            resumenHidden.type = 'hidden';
            resumenHidden.name = 'resumen_confirmacion';
            confirmationForm.appendChild(resumenHidden);
        }
        
        // Generar resumen
        const miembros = document.getElementById('familyMembers').value;
        const comida = document.getElementById('specialFood').value;
        let resumen = `Confirmación de ${firstName} ${lastName}\n`;
        resumen += `DNI: ${dni}\n`;
        resumen += `Estacionamiento: ${parkingHidden.value}\n`;
        resumen += `Grupo familiar: ${familyGroupHidden.value}\n`;
        if (familyGroupCheckbox.checked) {
            resumen += `Miembros del grupo: ${miembros}\n`;
        }
        if (comida.trim()) {
            resumen += `Comida especial: ${comida}\n`;
        }
        
        resumenHidden.value = resumen;
        
        // Mostrar estado de carga
        const submitBtn = confirmationForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Preparar datos para envío
        const formData = new FormData(confirmationForm);
        
        // Enviar con fetch
        fetch('https://formspree.io/f/mgvzyvbp', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showFormSuccess('confirmationMessage');
                confirmationForm.reset();
                // Resetear campos adicionales
                if (parkingHidden) parkingHidden.remove();
                if (familyGroupHidden) familyGroupHidden.remove();
                if (resumenHidden) resumenHidden.remove();
            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showFormError('confirmationError', 'Hubo un problema al enviar tu confirmación. Por favor, intenta nuevamente.');
        })
        .finally(() => {
            // Restaurar botón
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
    
    // Formatear DNI en tiempo real
    const dniInput = document.getElementById('dni');
    dniInput.addEventListener('input', function() {
        formatDNI(this);
    });
    
    // Validar formulario
    confirmationForm.addEventListener('submit', function(event) {
        const dni = dniInput.value.replace(/\./g, '');
        if (!validateDNI(dni)) {
            event.preventDefault();
            alert('Por favor, ingresa un DNI válido (7-8 dígitos).');
            dniInput.focus();
            return;
        }
    });
    
    // Animaciones al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Ejecutar animaciones iniciales
    setTimeout(animateOnScroll, 500);

    const overlay = document.getElementById('welcomeOverlay');
    const enterBtn = document.getElementById('enterBtn');
    if (overlay && enterBtn && backgroundMusic) {
        enterBtn.addEventListener('click', function() {
            backgroundMusic.play().then(() => {
                isMusicPlaying = true;
                updateMusicIcon();
            }).catch(() => {
                // Si no se puede reproducir automáticamente, mantener apagada
                isMusicPlaying = false;
                updateMusicIcon();
            });
            overlay.classList.add('hide');
            setTimeout(() => { overlay.style.display = 'none'; }, 800);
        });
    }

    // Modal No puedo ir
    const noAttendLink = document.getElementById('noAttendLink');
    const noAttendModal = document.getElementById('noAttendModal');
    const closeNoAttendModal = document.getElementById('closeNoAttendModal');
    const noAttendForm = document.getElementById('noAttendForm');
    if (noAttendLink && noAttendModal && closeNoAttendModal) {
        noAttendLink.addEventListener('click', function(e) {
            e.preventDefault();
            noAttendModal.classList.add('show');
            document.body.style.overflow = 'hidden';
            setTimeout(() => {
                noAttendModal.querySelector('.modal-content').style.transform = 'translateY(0)';
                noAttendModal.querySelector('.modal-content').style.opacity = '1';
            }, 10);
        });
        
        closeNoAttendModal.addEventListener('click', function() {
            noAttendModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            noAttendForm.reset();
        });
        
        // Cerrar modal al hacer clic fuera
        noAttendModal.addEventListener('click', function(event) {
            if (event.target === noAttendModal) {
                noAttendModal.classList.remove('show');
                document.body.style.overflow = 'auto';
                noAttendForm.reset();
            }
        });
        
        noAttendForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campo requerido
            const name = document.getElementById('noAttendName').value.trim();
            
            if (!name) {
                showFormError('noAttendError', 'Por favor, ingresa tu nombre.');
                return;
            }
            
            // Generar asunto dinámicamente
            const subject = `No puedo ir - ${name}`;
            document.getElementById('noAttendSubject').value = subject;
            
            // Mostrar estado de carga
            const submitBtn = noAttendForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Preparar datos para envío
            const formData = new FormData(noAttendForm);
            
            // Enviar con fetch
            fetch('https://formspree.io/f/mrblkbvw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormSuccess('noAttendMessage');
                    noAttendForm.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showFormError('noAttendError', 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Tooltip para información de estacionamiento
    const parkingInfo = document.getElementById('parkingInfo');
    const parkingTooltip = document.getElementById('parkingTooltip');
    if (parkingInfo && parkingTooltip) {
        parkingInfo.addEventListener('click', function() {
            parkingTooltip.classList.toggle('show');
        });

        // Cerrar tooltip al hacer clic fuera
        document.addEventListener('click', function(event) {
            if (!parkingInfo.contains(event.target) && !parkingTooltip.contains(event.target)) {
                parkingTooltip.classList.remove('show');
            }
        });

        // Cerrar tooltip al presionar Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                parkingTooltip.classList.remove('show');
            }
        });
    }

    // Funcionalidad para grupo familiar
    const familyGroupCheckbox = document.getElementById('familyGroup');
    const familyMembersGroup = document.getElementById('familyMembersGroup');
    const familyMembersInput = document.getElementById('familyMembers');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');

    if (familyGroupCheckbox && familyMembersGroup && familyMembersInput && decreaseBtn && increaseBtn) {
        // Inicializar estado deshabilitado
        familyMembersGroup.classList.add('disabled');
        familyMembersInput.disabled = true;
        decreaseBtn.disabled = true;
        increaseBtn.disabled = true;

        // Manejar cambio del checkbox
        familyGroupCheckbox.addEventListener('change', function() {
            if (this.checked) {
                familyMembersGroup.classList.remove('disabled');
                familyMembersInput.disabled = false;
                decreaseBtn.disabled = false;
                increaseBtn.disabled = false;
            } else {
                familyMembersGroup.classList.add('disabled');
                familyMembersInput.disabled = true;
                decreaseBtn.disabled = true;
                increaseBtn.disabled = true;
                familyMembersInput.value = 1;
            }
        });

        // Funcionalidad del contador
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(familyMembersInput.value);
            if (currentValue > 1) {
                familyMembersInput.value = currentValue - 1;
            }
        });

        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(familyMembersInput.value);
            if (currentValue < 10) {
                familyMembersInput.value = currentValue + 1;
            }
        });
    }
});

// Función para manejar teclas de escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if (modal.classList.contains('show')) {
            closeModalFunction();
        }
        if (noAttendModal && noAttendModal.classList.contains('show')) {
            noAttendModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            if (noAttendForm) noAttendForm.reset();
        }
    }
});

// Función para precargar la música
function preloadMusic() {
    backgroundMusic.load();
}



window.onload = function() {
    // Inicializar música con estado apagado
    const backgroundMusic = document.getElementById('backgroundMusic');
    isMusicPlaying = false;
    updateMusicIcon();
}; 