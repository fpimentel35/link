<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>lynkn.me - Encurtador de Links e Link na Bio</title>
    <meta name="description" content="Transforme links longos em links curtos e crie uma página personalizada de 'Link na Bio' para agrupar todos os seus links importantes. Monitore e personalize.">
    <meta name="keywords" content="encurtador de link, link na bio, links personalizados, agregador de links, marketing digital">
    <link rel="canonical" href="https://lynkn.me">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://lynkn.me/">
    <meta property="og:title" content="lynkn.me - Encurtador de Links e Link na Bio">
    <meta property="og:description" content="Transforme links longos em links curtos e crie uma página personalizada de 'Link na Bio' para agrupar todos os seus links importantes.">
    <meta property="og:image" content="https://placehold.co/1200x630/667eea/ffffff?text=lynkn.me">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://lynkn.me/">
    <meta property="twitter:title" content="lynkn.me - Encurtador de Links e Link na Bio">
    <meta property="twitter:description" content="Transforme links longos em links curtos e crie uma página personalizada de 'Link na Bio' para agrupar todos os seus links importantes.">
    <meta property="twitter:image" content="https://placehold.co/1200x630/667eea/ffffff?text=lynkn.me">

    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://js.stripe.com/v3/"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .gradient-text {
            background: linear-gradient(135deg, #8b9ff8 0%, #a27de0 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card-shadow {
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        .bio-preview-phone {
            background-size: cover;
            background-position: center;
            transition: all 0.3s ease-in-out;
        }
        .modal-backdrop, .notification {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        }
        .modal-content {
            transition: transform 0.3s ease-in-out;
        }
        .tab-button {
            transition: color 0.2s, border-color 0.2s;
        }
        .tab-button.active {
            color: #a27de0;
            border-color: #a27de0;
        }
        .embed-container iframe {
            width: 100%;
            height: auto;
            aspect-ratio: 16 / 9;
            border-radius: 0.75rem; /* 12px */
            border: none;
        }
        [x-cloak] { display: none !important; }
    </style>
</head>
<body x-data="app()" x-init="initFirebase()" class="bg-gray-900 text-gray-200">

    <!-- Wrapper -->
    <main>
        <!-- Header -->
        <header class="sticky top-0 left-0 right-0 z-20 p-4 bg-transparent backdrop-blur-sm transition-all duration-300">
            <div class="container mx-auto flex justify-between items-center">
                <h2 class="text-2xl font-bold text-white">lynkn.me</h2>
                <nav class="flex items-center gap-4">
                    <a href="#plans" class="text-white opacity-80 hover:opacity-100 transition hidden sm:block">Planos</a>
                    
                    <div x-show="!isLoggedIn" class="flex items-center gap-4">
                        <button @click="showModal = true; authMode = 'login'; modalContent = 'auth'" class="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 transition-all duration-300">Entrar</button>
                    </div>

                    <div x-show="isLoggedIn" x-cloak class="flex items-center gap-4">
                        <span x-text="displayName" class="text-white font-semibold hidden md:block"></span>
                        <button @click="logout()" class="bg-red-500/50 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500/70 transition-all duration-300">Sair</button>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Hero Section -->
        <section id="hero" class="gradient-bg text-white pt-32 pb-20 relative overflow-hidden -mt-20">
            <div class="container mx-auto text-center px-4">
                <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-4">Transforme seus links em experiências que vendem</h1>
                <p class="text-lg md:text-xl max-w-3xl mx-auto opacity-90 mb-8">Encurte, personalize e crie sua página de "Link na Bio". Tudo na nuvem.</p>
                <a href="#creator" class="bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-200 transform hover:scale-105 transition-all duration-300">Comece Grátis</a>
            </div>
             <div class="absolute -bottom-1 left-0 w-full h-16 bg-gray-900" style="clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);"></div>
        </section>

        <!-- Link Creator Section -->
        <section id="creator" class="py-20" aria-labelledby="creator-heading">
            <div class="container mx-auto px-4">
                 <article class="max-w-6xl mx-auto">
                    <!-- TABS -->
                    <div class="mb-8 border-b border-gray-700">
                        <nav class="flex space-x-8" aria-label="Tabs">
                            <button @click="setCreatorMode('link')" :class="{ 'active': creatorMode === 'link' }" class="tab-button whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-lg text-gray-400 border-transparent">
                                Encurtar Link
                            </button>
                            <button @click="setCreatorMode('bio')" :class="{ 'active': creatorMode === 'bio' }" class="tab-button whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-lg text-gray-400 border-transparent">
                                Link na Bio
                            </button>
                        </nav>
                    </div>

                    <!-- Link Shortener View -->
                    <div x-show="creatorMode === 'link'" x-transition>
                        <div class="max-w-xl mx-auto">
                            <div class="flex flex-col">
                                <h2 id="creator-heading" class="text-2xl font-bold mb-1">Crie seu link irresistível</h2>
                                <p class="text-gray-400 mb-6">Seus links são salvos na nuvem.</p>
                                
                                <div class="space-y-4">
                                    <div>
                                        <label for="originalUrl" class="block text-sm font-medium">Link Original</label>
                                        <input type="url" x-model="link.originalUrl" id="originalUrl" placeholder="https://seusite.com/produto-incrivel" class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                                    </div>
                                    <div>
                                        <label for="customSlug" class="block text-sm font-medium">Slug Personalizado (opcional)</label>
                                        <div class="flex items-center mt-1">
                                            <span class="inline-flex items-center px-3 py-3 text-gray-500 bg-gray-700 border border-r-0 border-gray-600 rounded-l-lg">lynkn.me/</span>
                                            <input type="text" x-model="link.slug" id="customSlug" placeholder="oferta-top" class="flex-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                                        </div>
                                    </div>
                                    <div class="border-t border-gray-700 pt-4">
                                        <h3 class="font-bold text-lg text-indigo-400">Recursos Premium ✨</h3>
                                        <p class="text-sm text-gray-400 mb-4">Faça upgrade para personalizar.</p>
                                        <div class="space-y-4" :class="{ 'opacity-50': userPlan === 'free' }">
                                            <div>
                                                <label for="gaId" class="block text-sm font-medium">ID do Google Analytics</label>
                                                <input type="text" x-model="link.gaId" id="gaId" placeholder="UA-12345678-9" class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg shadow-sm" :disabled="userPlan === 'free'">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <!-- Bio Link View -->
                    <div x-show="creatorMode === 'bio'" x-cloak x-transition>
                         <div class="grid lg:grid-cols-2 gap-12 items-start">
                            <!-- Left Side: Bio Form -->
                            <div class="flex flex-col">
                                <h2 id="bio-creator-heading" class="text-2xl font-bold mb-1">Crie sua página "Link na Bio"</h2>
                                <p class="text-gray-400 mb-6">Agrupe seus links mais importantes em um só lugar.</p>
                                <div class="space-y-6">
                                    <!-- Abas Internas: Conteúdo e Aparência -->
                                    <div class="border-b border-gray-700">
                                        <nav class="-mb-px flex space-x-6" aria-label="Bio Tabs">
                                            <button @click="bioTab = 'content'" :class="{'text-indigo-400 border-indigo-500': bioTab === 'content', 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300': bioTab !== 'content'}" class="whitespace-nowrap py-2 px-1 border-b-2 font-medium">Conteúdo</button>
                                            <button @click="bioTab = 'appearance'" :class="{'text-indigo-400 border-indigo-500': bioTab === 'appearance', 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300': bioTab !== 'appearance'}" class="whitespace-nowrap py-2 px-1 border-b-2 font-medium">Aparência</button>
                                            <button @click="bioTab = 'embed'" :class="{'text-indigo-400 border-indigo-500': bioTab === 'embed', 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-300': bioTab !== 'embed'}" class="whitespace-nowrap py-2 px-1 border-b-2 font-medium">Embed</button>
                                        </nav>
                                    </div>

                                    <!-- Aba de Conteúdo -->
                                    <div x-show="bioTab === 'content'" x-transition class="space-y-6">
                                        <div>
                                            <label for="bioPhoto" class="block text-sm font-medium">Foto de Perfil</label>
                                            <div class="mt-1 flex items-center gap-4">
                                                <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-700">
                                                    <img x-show="bioPage.photoURL" :src="bioPage.photoURL" class="h-full w-full object-cover" alt="Pré-visualização da foto de perfil">
                                                    <svg x-show="!bioPage.photoURL" class="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                </span>
                                                <input type="file" @change="uploadProfilePhoto($event)" id="bioPhoto" class="hidden" accept="image/*">
                                                <label for="bioPhoto" class="cursor-pointer rounded-md border border-gray-600 bg-gray-800 py-2 px-3 text-sm font-medium leading-4 text-gray-300 shadow-sm hover:bg-gray-700">Mudar</label>
                                                <div x-show="isUploadingPhoto" x-cloak class="text-sm text-gray-500">Enviando...</div>
                                            </div>
                                        </div>
                                        <div>
                                            <label for="bioTitle" class="block text-sm font-medium">Título (ex: @seunome)</label>
                                            <input type="text" x-model="bioPage.title" id="bioTitle" placeholder="Seu Nome ou Marca" class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                                        </div>
                                         <div>
                                            <label for="bioDescription" class="block text-sm font-medium">Descrição</label>
                                            <textarea x-model="bioPage.description" id="bioDescription" rows="2" placeholder="Fale um pouco sobre você ou seus links." class="mt-1 block w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"></textarea>
                                        </div>
                                        <div class="border-t border-gray-700 pt-6">
                                            <h3 class="font-bold text-lg mb-4">Seus Links</h3>
                                            <div class="space-y-4">
                                                <template x-for="(bioLink, index) in bioPage.links" :key="index">
                                                    <div class="flex flex-col gap-4 p-4 bg-gray-800/50 rounded-lg">
                                                        <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <input type="text" x-model="bioLink.title" placeholder="Título do Link (ex: Meu Website)" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                                                            <input type="url" x-model="bioLink.url" placeholder="https://..." class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                                                        </div>
                                                        <div class="flex items-center justify-between">
                                                            <select x-model="bioLink.icon" class="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm">
                                                                <option value="none">Nenhum ícone</option>
                                                                <option value="link">Link Genérico</option>
                                                                <option value="whatsapp">WhatsApp</option>
                                                                <option value="instagram">Instagram</option>
                                                                <option value="tiktok">TikTok</option>
                                                                <option value="facebook">Facebook</option>
                                                                <option value="x">X (Twitter)</option>
                                                                <option value="email">E-mail</option>
                                                            </select>
                                                            <button @click="removeBioLinkField(index)" class="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-900/50" aria-label="Remover Link">
                                                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                             <button @click="addBioLinkField()" class="mt-4 w-full py-2 px-6 border-2 border-dashed border-gray-600 text-gray-400 font-semibold rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-all">
                                                + Adicionar novo link
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Aba de Aparência -->
                                    <div x-show="bioTab === 'appearance'" x-transition class="space-y-6">
                                        <div>
                                            <label class="block text-sm font-medium">Plano de Fundo</label>
                                            <div class="mt-2 flex flex-wrap items-center gap-2">
                                                <template x-for="color in colorOptions.background" :key="color.value">
                                                    <button @click="bioPage.background = color.value" :disabled="color.premium && userPlan === 'free'" :class="{'ring-2 ring-indigo-500': bioPage.background === color.value, 'opacity-50 cursor-not-allowed': color.premium && userPlan === 'free'}" class="w-8 h-8 rounded-full border-2 border-white/50" :style="{ background: color.class ? '' : color.value }" :class="{[color.class]: color.class}"></button>
                                                </template>
                                                <div :class="{'opacity-50': userPlan === 'free'}">
                                                    <input type="color" x-model="bioPage.background" :disabled="userPlan === 'free'" class="w-8 h-8 p-1 bg-gray-700 rounded-full cursor-pointer">
                                                </div>
                                            </div>
                                            <p x-show="userPlan === 'free'" class="text-xs text-gray-500 mt-2">Mais opções no plano Premium.</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium">Cor dos Botões</label>
                                             <div class="mt-2 flex flex-wrap items-center gap-2">
                                                <template x-for="color in colorOptions.buttons" :key="color.value">
                                                    <button @click="bioPage.buttonColor = color.value" :disabled="color.premium && userPlan === 'free'" :class="{'ring-2 ring-indigo-500': bioPage.buttonColor === color.value, 'opacity-50 cursor-not-allowed': color.premium && userPlan === 'free'}" class="w-8 h-8 rounded-full border-2 border-white/50" :style="{ backgroundColor: color.color }"></button>
                                                </template>
                                                <div :class="{'opacity-50': userPlan === 'free'}">
                                                    <input type="color" x-model="bioPage.buttonColor" :disabled="userPlan === 'free'" class="w-8 h-8 p-1 bg-gray-700 rounded-full cursor-pointer">
                                                </div>
                                             </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium">Estilo da Borda dos Botões</label>
                                             <div class="mt-2 grid grid-cols-3 gap-4">
                                                <button @click="bioPage.buttonStyle = 'square'" :class="{'ring-2 ring-indigo-500': bioPage.buttonStyle === 'square'}" class="py-2 px-4 rounded-md bg-gray-700 border">Quadrado</button>
                                                <button @click="bioPage.buttonStyle = 'rounded'" :class="{'ring-2 ring-indigo-500': bioPage.buttonStyle === 'rounded'}" class="py-2 px-4 rounded-full bg-gray-700 border">Redondo</button>
                                                <button @click="bioPage.buttonStyle = 'dotted'" :class="{'ring-2 ring-indigo-500': bioPage.buttonStyle === 'dotted'}" class="py-2 px-4 rounded-lg bg-transparent border-2 border-dashed border-gray-500">Pontilhado</button>
                                             </div>
                                        </div>
                                        <div class="border-t border-gray-700 pt-4" :class="{ 'opacity-50': userPlan === 'free' }">
                                            <h3 class="font-bold text-lg text-indigo-400">Recursos Premium ✨</h3>
                                            <div class="mt-4 flex items-center justify-between">
                                                <label for="verifiedBadge" class="font-medium">Selo de Verificado</label>
                                                <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                                    <input type="checkbox" x-model="bioPage.verified" name="verifiedBadge" id="verifiedBadge" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" :disabled="userPlan === 'free'"/>
                                                    <label for="verifiedBadge" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Aba Embed -->
                                    <div x-show="bioTab === 'embed'" x-transition class="space-y-4">
                                         <h3 class="font-bold text-lg">Incorporar Conteúdo</h3>
                                         <p class="text-sm text-gray-500">Cole o código de incorporação de serviços como YouTube ou Spotify. Será exibido no fim da sua página.</p>
                                        <textarea x-model="bioPage.embedCode" rows="6" placeholder='<iframe src="..."></iframe>' class="w-full p-2 bg-gray-800 border border-gray-600 rounded-md font-mono text-sm"></textarea>
                                    </div>
                                </div>
                            </div>
                            <!-- Right Side: Bio Preview -->
                            <div>
                                <h3 class="text-2xl font-bold mb-1">Pré-visualização</h3>
                                <p class="text-gray-400 mb-6">Veja como sua página ficará.</p>
                                <!-- Phone mock -->
                                <div class="w-full max-w-sm mx-auto bg-gray-600 rounded-[40px] border-[10px] border-indigo-600 shadow-xl overflow-hidden bio-preview-phone">
                                    <div class="w-full h-[600px] overflow-y-auto p-6 relative bg-white" :style="{ background: getBioBackground() }">
                                        <div class="text-center" :class="getPreviewTextColor(bioPage.background)">
                                            <div class="w-24 h-24 rounded-full mx-auto mb-2 flex items-center justify-center ring-4 ring-indigo-500 overflow-hidden">
                                                <img x-show="bioPage.photoURL" :src="bioPage.photoURL" class="w-full h-full object-cover" alt="Foto de perfil do usuário">
                                                <svg x-show="!bioPage.photoURL" class="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            </div>
                                            <div class="flex justify-center items-center gap-2">
                                                <h4 class="font-bold text-xl" x-text="bioPage.title || '@seunome'"></h4>
                                                <svg x-show="bioPage.verified" x-cloak class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-label="Selo de verificado"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                                            </div>
                                            <p class="text-sm mt-1" x-text="bioPage.description || 'Sua descrição aqui.'"></p>
                                        </div>
                                        
                                        <div class="mt-6 space-y-4">
                                            <template x-for="bioLink in bioPage.links.filter(l => l.title)">
                                                <a href="#" @click.prevent class="flex items-center justify-center gap-3 w-full text-center p-4 font-semibold hover:scale-105 transition-transform" :class="getBioButtonStyleClass()" :style="{ backgroundColor: getBioButtonColor(), color: getButtonTextColor(getBioButtonColor()), borderColor: bioPage.buttonStyle === 'dotted' ? getBioButtonColor() : 'transparent' }">
                                                    <div x-html="getSocialIcon(bioLink.icon)" class="w-5 h-5"></div>
                                                    <span x-text="bioLink.title"></span>
                                                </a>
                                            </template>
                                        </div>
                                        <div x-show="bioPage.embedCode" x-cloak class="mt-6 embed-container" x-html="bioPage.embedCode"></div>
                                        <div class="absolute bottom-4 left-0 right-0 text-center text-xs" x-show="userPlan === 'free'" x-cloak>
                                            <a href="#" @click.prevent class="font-bold" :class="getPreviewTextColor(bioPage.background)">Criado com <b class="gradient-text">lynkn.me</b></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Button -->
                     <div class="pt-6 mt-6 border-t border-gray-700">
                        <button @click="creatorMode === 'link' ? saveLink() : saveBioPage()" :disabled="!isLoggedIn" class="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                            <span x-show="isLoggedIn && creatorMode === 'link'">Salvar Link</span>
                            <span x-show="isLoggedIn && creatorMode === 'bio'">Salvar Página Bio</span>
                            <span x-show="!isLoggedIn">Faça login para salvar</span>
                        </button>
                    </div>

                 </article>
            </div>
        </section>

        <!-- My Links Section -->
        <section x-show="isLoggedIn" x-cloak id="my-links" class="py-20 bg-gray-800" aria-labelledby="my-links-heading">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                     <h2 id="my-links-heading" class="text-3xl md:text-4xl font-extrabold">Meus Itens Salvos</h2>
                     <p class="text-lg text-gray-300 mt-2 max-w-2xl mx-auto">Gerencie seus links e sua página "Link na Bio".</p>
                </div>
                <div class="max-w-4xl mx-auto">
                    <div x-show="userLinks.length === 0" class="text-center text-gray-400 p-8 border-2 border-dashed border-gray-600 rounded-lg">
                        <p>Você ainda não criou nenhum item.</p>
                        <p>Use o formulário acima para começar!</p>
                    </div>
                    <div class="space-y-4">
                        <template x-for="userLink in userLinks" :key="userLink.id">
                             <div class="bg-gray-700 p-4 rounded-lg flex items-center justify-between flex-wrap gap-4">
                                <div class="flex-1 min-w-[200px]">
                                    <p class="font-bold text-indigo-400" x-text="`lynkn.me/${userLink.slug}`"></p>
                                    <p class="text-sm text-gray-400 truncate" x-text="userLink.originalUrl"></p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <span class="text-sm text-gray-500">Cliques: 0</span>
                                    <button @click="showAnalytics(userLink)" class="p-2 rounded-md" :class="userPlan === 'free' ? 'cursor-not-allowed text-gray-500' : 'text-indigo-400 hover:bg-indigo-900/50'">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                    </button>
                                    <button @click="deleteLink(userLink.id)" class="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-900/50" aria-label="Apagar link">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <!-- Plans Section -->
        <section id="plans" class="py-20" aria-labelledby="plans-heading">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 id="plans-heading" class="text-3xl md:text-4xl font-extrabold">Planos para todos os níveis</h2>
                    <p class="text-lg text-gray-300 mt-2">Comece grátis e evolua quando precisar de mais poder.</p>
                </div>
                <div class="flex flex-col sm:flex-row justify-center items-center gap-8">
                    <!-- Free Plan -->
                    <div class="w-full max-w-sm border border-gray-700 rounded-xl p-8 card-shadow bg-gray-800">
                        <h3 class="text-2xl font-bold text-center">Gratuito</h3>
                        <p class="text-gray-400 text-center mt-2 mb-6">Para começar com o essencial.</p>
                        <p class="text-center mb-6"><span class="text-4xl font-extrabold">R$0</span></p>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Encurtador de links</li>
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>1 Página "Link na Bio"</li>
                            <li class="flex items-center text-gray-500"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Personalização Avançada</li>
                             <li class="flex items-center text-gray-500"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Google Analytics</li>
                             <li class="flex items-center text-gray-500"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>Análise de Cliques</li>
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Marca d'água lynkn.me</li>
                        </ul>
                        <button class="w-full py-3 px-6 border border-indigo-400 text-indigo-400 font-bold rounded-lg hover:bg-indigo-900/20 transition-all">Seu plano atual</button>
                    </div>

                    <!-- Premium Plan -->
                    <div class="w-full max-w-sm border-2 border-indigo-500 rounded-xl p-8 card-shadow bg-gray-800 relative">
                         <span class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Mais Popular</span>
                        <h3 class="text-2xl font-bold text-center text-indigo-400">Premium</h3>
                        <p class="text-gray-400 text-center mt-2 mb-6">Para quem busca o máximo de conversão.</p>
                        <p class="text-center mb-6"><span class="text-4xl font-extrabold">R$29</span><span class="text-gray-400">/mês</span></p>
                        <ul class="space-y-3 mb-8">
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Todos recursos do Gratuito</li>
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Personalização Completa</li>
                            <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Google Analytics</li>
                             <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Análise de Cliques</li>
                             <li class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Sem marca d'água</li>
                        </ul>
                        <button @click="upgradePlan()" class="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition-all">Fazer Upgrade</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black text-white py-12">
            <div class="container mx-auto px-4 text-center">
                <p>&copy; <span x-text="new Date().getFullYear()"></span> lynkn.me. Todos os direitos reservados.</p>
            </div>
        </footer>
    </main>
    
    <!-- Modals -->
    <div x-show="showModal" x-cloak class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 modal-backdrop p-4">
        <!-- Login/Signup Modal -->
        <div x-show="modalContent === 'auth'" @click.away="showModal = false" class="bg-gray-800 rounded-2xl w-full max-w-md p-8 card-shadow modal-content" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 transform scale-95" x-transition:enter-end="opacity-100 transform scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 transform scale-100" x-transition:leave-end="opacity-0 transform scale-95">
             <div class="flex justify-between items-center mb-6">
                 <h2 class="text-2xl font-bold" x-text="authMode === 'login' ? 'Acesse sua Conta' : 'Crie sua Conta'"></h2>
                 <button @click="showModal = false" class="text-gray-400 hover:text-gray-200">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
             </div>
            <div class="space-y-4">
                 <div x-show="authMode === 'signup'" x-transition>
                    <label for="username" class="block text-sm font-medium text-gray-300">Nome de utilizador</label>
                    <input type="text" x-model="credentials.username" id="username" class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                 </div>
                 <div>
                    <label for="email" class="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" x-model="credentials.email" id="email" class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                 </div>
                 <div>
                    <label for="password" class="block text-sm font-medium text-gray-300">Senha</label>
                    <input type="password" x-model="credentials.password" id="password" class="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                 </div>
                 <div>
                    <button @click="authMode === 'login' ? login() : signup()" class="w-full py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all" x-text="authMode === 'login' ? 'Entrar' : 'Criar Conta'"></button>
                 </div>
                 <p class="text-center text-sm">
                    <span x-text="authMode === 'login' ? 'Não tem conta?' : 'Já tem conta?'"></span>
                    <button @click="authMode = (authMode === 'login' ? 'signup' : 'login')" class="font-medium text-indigo-400 hover:text-indigo-300" x-text="authMode === 'login' ? 'Cadastre-se' : 'Entre'"></button>
                 </p>
            </div>
        </div>
        
        <!-- Analytics Modal -->
         <div x-show="modalContent === 'analytics'" @click.away="showModal = false" class="bg-gray-800 rounded-2xl w-full max-w-md p-8 card-shadow modal-content" x-transition>
             <div class="flex justify-between items-center mb-6">
                 <h2 class="text-2xl font-bold">Análise de Cliques</h2>
                 <button @click="showModal = false" class="text-gray-400 hover:text-gray-200">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
             </div>
            <div x-show="selectedLink" class="text-center">
                <p class="text-gray-400">Link: <b class="text-indigo-400" x-text="selectedLink ? selectedLink.slug : ''"></b></p>
                <p class="text-6xl font-extrabold my-4" x-text="selectedLink ? selectedLink.clicks : 0"></p>
                <p class="text-gray-500">Cliques totais</p>
            </div>
        </div>

        <!-- Payment Modal -->
        <div x-show="modalContent === 'payment'" @click.away="showModal = false" class="bg-gray-800 rounded-2xl w-full max-w-md p-8 card-shadow modal-content" x-transition>
            <h2 class="text-2xl font-bold mb-4">Finalizar Assinatura Premium</h2>
            <form id="payment-form">
                <div id="payment-element" class="p-4 bg-gray-900 rounded-md"></div>
                <button id="submit-payment" class="w-full mt-6 py-3 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all">
                    <span id="button-text">Pagar R$29,00</span>
                    <span id="spinner" style="display: none;">Processando...</span>
                </button>
                <div id="payment-message" class="hidden text-center text-red-400 mt-2"></div>
            </form>
        </div>
    </div>

    <!-- Notification -->
    <div x-show="notification.show" x-cloak class="notification fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg card-shadow" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 transform translate-y-2" x-transition:enter-end="opacity-100 transform translate-y-0" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 transform translate-y-0" x-transition:leave-end="opacity-0 transform translate-y-2">
        <p x-text="notification.message"></p>
    </div>

    <!-- Firebase and AlpineJS Scripts -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot, doc, deleteDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js";

        // --- AlpineJS Data ---
        window.app = function() {
            return {
                // State
                isLoggedIn: false,
                isUploadingPhoto: false,
                showModal: false,
                modalContent: 'auth',
                authMode: 'login',
                userId: null,
                displayName: null,
                userPlan: 'free',
                userLinks: [],
                selectedLink: null,
                creatorMode: 'link',
                bioTab: 'content',
                credentials: { email: '', password: '', username: '' },
                link: {
                    originalUrl: '',
                    slug: '',
                    gaId: '',
                },
                bioPage: {
                    title: '',
                    description: '',
                    links: [{ title: '', url: '', icon: 'none' }],
                    verified: false,
                    buttonColor: 'default',
                    buttonStyle: 'rounded',
                    background: '#FFFFFF',
                    photoURL: '',
                    embedCode: '',
                },
                colorOptions: {
                    background: [
                        { value: '#FFFFFF', premium: false }, { value: '#1F2937', premium: false }, { value: '#000000', premium: false },
                        { value: '#BE123C', premium: true }, { value: '#047857', premium: true }, { value: '#1D4ED8', premium: true },
                        { value: 'gradient1', premium: true, class: 'bg-gradient-to-r from-green-300 to-blue-400' },
                        { value: 'gradient2', premium: true, class: 'bg-gradient-to-r from-pink-500 to-yellow-500' },
                        { value: 'gradient3', premium: true, class: 'bg-gradient-to-r from-purple-400 to-indigo-500' },
                    ],
                    buttons: [
                         { value: 'default', premium: false, color: '#4f46e5' }, { value: '#FFFFFF', premium: false, color: '#FFFFFF' }, { value: '#000000', premium: false, color: '#000000' },
                         { value: '#EF4444', premium: true, color: '#EF4444' }, { value: '#F59E0B', premium: true, color: '#F59E0B' }, { value: '#22C55E', premium: true, color: '#22C55E' },
                         { value: '#3B82F6', premium: true, color: '#3B82F6' }, { value: '#8B5CF6', premium: true, color: '#8B5CF6' }, { value: '#EC4899', premium: true, color: '#EC4899' },
                    ]
                },
                notification: { show: false, message: '' },
                
                // Firebase Services
                auth: null,
                db: null,
                appId: 'default-app-id',
                unsubscribeLinks: null,
                isAuthReady: false,
                
                // Stripe
                stripe: null,
                elements: null,

                // Methods
                initFirebase() {
                    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : 
                    {
                        apiKey: "AIzaSyBYcnWPrR0jvLmtcBc0aDrZn2HP2O7QyrM",
                        authDomain: "linkn-4d006.firebaseapp.com",
                        projectId: "linkn-4d006",
                        storageBucket: "linkn-4d006.firebasestorage.app",
                        messagingSenderId: "74692137411",
                        appId: "1:74692137411:web:da0a98fe48dc0c7341ed76",
                        measurementId: "G-DJZ3M0VE8J"
                    };
                    
                    if (!firebaseConfig.apiKey) {
                        console.error("Configuração do Firebase não encontrada.");
                        this.showNotification("Erro: A configuração do Firebase não está completa.");
                        return;
                    }
                    
                    this.appId = firebaseConfig.appId;
                    const app = initializeApp(firebaseConfig);
                    this.auth = getAuth(app);
                    this.db = getFirestore(app);
                    
                    this.handleAuthState();
                },

                async handleAuthState() {
                    await setPersistence(this.auth, browserSessionPersistence);

                    const initialAuthCheck = new Promise(resolve => {
                        const unsubscribe = onAuthStateChanged(this.auth, async (user) => {
                            unsubscribe(); 
                            resolve(user);
                        });
                    });

                    let user = await initialAuthCheck;

                    if (!user) {
                        try {
                            const token = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
                            if (token) {
                                await signInWithCustomToken(this.auth, token);
                            } else {
                                await signInAnonymously(this.auth);
                            }
                            user = this.auth.currentUser;
                        } catch (error) {
                            console.error("Erro na autenticação inicial, tentando anônimo:", error);
                            if (!this.auth.currentUser) await signInAnonymously(this.auth).catch(e => console.error("Falha no fallback anônimo:", e));
                            user = this.auth.currentUser;
                        }
                    }

                    onAuthStateChanged(this.auth, (newUser) => {
                        this.isAuthReady = true;
                        if (this.unsubscribeLinks) this.unsubscribeLinks();

                        if (newUser && !newUser.isAnonymous) {
                            this.isLoggedIn = true;
                            this.userId = newUser.uid;
                            this.showModal = false;
                            this.loadUserData();
                            this.loadUserLinks();
                        } else {
                            this.isLoggedIn = false;
                            this.userId = newUser ? newUser.uid : null;
                            this.displayName = null;
                            this.userLinks = [];
                            this.userPlan = 'free';
                            this.bioPage = { title: '', description: '', links: [{ title: '', url: '', icon: 'none' }], verified: false, buttonColor: 'default', buttonStyle: 'rounded', background: '#FFFFFF', photoURL: '', embedCode: '' };
                        }
                    });

                     if (user) {
                        this.isAuthReady = true;
                        if (!user.isAnonymous) {
                            this.isLoggedIn = true;
                            this.userId = user.uid;
                            this.loadUserData();
                            this.loadUserLinks();
                        } else {
                            this.isLoggedIn = false;
                            this.userId = user.uid;
                        }
                    }
                },

                async signup() {
                    if(!this.credentials.username) {
                        this.showNotification("Por favor, escolha um nome de utilizador.");
                        return;
                    }
                    try {
                        const userCredential = await createUserWithEmailAndPassword(this.auth, this.credentials.email, this.credentials.password);
                        const userProfileRef = doc(this.db, 'artifacts', this.appId, 'users', userCredential.user.uid);
                        await setDoc(userProfileRef, {
                            username: this.credentials.username,
                            email: userCredential.user.email,
                            plan: 'free',
                            createdAt: serverTimestamp(),
                            bioTitle: `@${this.credentials.username}`,
                            bioDescription: '',
                            bioLinks: [],
                            bioButtonStyle: 'rounded',
                            bioButtonColor: 'default',
                            bioBackground: '#FFFFFF',
                            bioVerified: false,
                            bioPhotoURL: '',
                            bioEmbedCode: '',
                        });
                        this.showNotification("Conta criada com sucesso!");
                    } catch (error) {
                        this.showNotification(`Erro: ${error.message}`);
                    }
                },
                
                async login() {
                    try {
                        await signInWithEmailAndPassword(this.auth, this.credentials.email, this.credentials.password);
                        this.showNotification("Login efetuado com sucesso!");
                    } catch (error) {
                        this.showNotification(`Erro: ${error.message}`);
                    }
                },
                
                async logout() {
                    await signOut(this.auth);
                    this.showNotification("Você foi desconectado.");
                },

                async saveLink() {
                    if (!this.link.originalUrl || !this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) {
                        this.showNotification("Faça login para salvar um link.");
                        this.showModal = true;
                        this.modalContent = 'auth';
                        return;
                    }
                    try {
                        const linksCollection = collection(this.db, 'artifacts', this.appId, 'users', this.userId, 'links');
                        await addDoc(linksCollection, {
                            originalUrl: this.link.originalUrl,
                            slug: this.link.slug || this.generateRandomSlug(),
                            gaId: this.userPlan === 'premium' ? this.link.gaId : '',
                            createdAt: serverTimestamp(),
                            clicks: 0
                        });
                        this.showNotification("Link salvo com sucesso!");
                        this.link.originalUrl = '';
                        this.link.slug = '';
                    } catch (error) {
                        this.showNotification(`Erro ao salvar: ${error.message}`);
                    }
                },
                
                async saveBioPage() {
                    if (!this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) {
                        this.showNotification("Faça login para salvar sua página.");
                        this.showModal = true;
                        this.modalContent = 'auth';
                        return;
                    }
                    try {
                        const userProfileRef = doc(this.db, 'artifacts', this.appId, 'users', this.userId);
                        const linksToSave = this.bioPage.links.filter(link => link.title.trim() !== '' && link.url.trim() !== '');
                        await setDoc(userProfileRef, {
                            bioTitle: this.bioPage.title,
                            bioDescription: this.bioPage.description,
                            bioLinks: linksToSave,
                            bioButtonStyle: this.bioPage.buttonStyle,
                            bioButtonColor: this.bioPage.buttonColor,
                            bioBackground: this.bioPage.background,
                            bioVerified: this.userPlan === 'premium' ? this.bioPage.verified : false,
                            bioPhotoURL: this.bioPage.photoURL,
                            bioEmbedCode: this.bioPage.embedCode,
                            updatedAt: serverTimestamp()
                        }, { merge: true });
                         this.showNotification("Página 'Link na Bio' salva com sucesso!");
                    } catch (error) {
                        this.showNotification(`Erro ao salvar página: ${error.message}`);
                    }
                },

                loadUserLinks() {
                    if (!this.isAuthReady || !this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) return;
                    const linksCollection = collection(this.db, 'artifacts', this.appId, 'users', this.userId, 'links');
                    const q = query(linksCollection);
                    
                    this.unsubscribeLinks = onSnapshot(q, (querySnapshot) => {
                        this.userLinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    }, (error) => {
                        console.error("Firebase Snapshot Error:", error);
                    });
                },

                async loadUserData() {
                    if (!this.isAuthReady || !this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) return;
                    const userProfileRef = doc(this.db, 'artifacts', this.appId, 'users', this.userId);
                    try {
                        const docSnap = await getDoc(userProfileRef);
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            this.displayName = data.username || null;
                            this.userPlan = data.plan || 'free';
                            this.bioPage.title = data.bioTitle || '';
                            this.bioPage.description = data.bioDescription || '';
                            this.bioPage.links = data.bioLinks && data.bioLinks.length > 0 ? data.bioLinks : [{ title: '', url: '', icon: 'none' }];
                            this.bioPage.buttonStyle = data.bioButtonStyle || 'rounded';
                            this.bioPage.buttonColor = data.bioButtonColor || 'default';
                            this.bioPage.background = data.bioBackground || '#FFFFFF';
                            this.bioPage.verified = data.bioVerified || false;
                            this.bioPage.photoURL = data.bioPhotoURL || '';
                            this.bioPage.embedCode = data.bioEmbedCode || '';
                        } else {
                             this.userPlan = 'free';
                             this.bioPage = { title: '', description: '', links: [{ title: '', url: '', icon: 'none' }], buttonStyle: 'rounded', buttonColor: 'default', background: '#FFFFFF', verified: false, photoURL: '', embedCode: '' };
                        }
                    } catch (error) {
                         console.error("Erro ao carregar dados do usuário:", error);
                         this.showNotification("Erro ao carregar seus dados de perfil.");
                         this.userPlan = 'free';
                    }
                },
                
                async uploadProfilePhoto(event) {
                    const file = event.target.files[0];
                    if (!file || !this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) {
                        if (!this.userId || (this.auth.currentUser && this.auth.currentUser.isAnonymous)) {
                            this.showNotification("Faça login para enviar uma foto.");
                            this.showModal = true;
                            this.modalContent = 'auth';
                        }
                        return;
                    }

                    const apiKey = 'cc86c1e0e12b7ffe3d91899dc867df60';

                    if(apiKey === 'YOUR_IMGBB_API_KEY') {
                        this.showNotification("Erro: A chave da API do ImgBB não está configurada.");
                        console.error("Configure sua chave de API do ImgBB no código para fazer o upload de imagens.");
                        return;
                    }

                    this.isUploadingPhoto = true;
                    
                    const formData = new FormData();
                    formData.append('image', file);

                    try {
                        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                            method: 'POST',
                            body: formData,
                        });

                        const result = await response.json();

                        if (result.success) {
                            this.bioPage.photoURL = result.data.url;
                            await this.saveBioPage();
                            this.showNotification("Foto de perfil atualizada!");
                        } else {
                            throw new Error(result.error.message);
                        }
                    } catch (error) {
                        console.error("Erro no upload da foto para o ImgBB:", error);
                        this.showNotification(`Erro ao enviar a foto: ${error.message}`);
                    } finally {
                        this.isUploadingPhoto = false;
                    }
                },
                
                async upgradePlan() {
                    if (!this.isLoggedIn) {
                        this.showNotification("Por favor, faça login para fazer o upgrade.");
                        this.modalContent = 'auth';
                        this.showModal = true;
                        return;
                    }

                    this.modalContent = 'payment';
                    this.showModal = true;

                    await this.$nextTick(); 

                    // <-- ATUALIZE AQUI com a sua chave publicável do Stripe -->
                    this.stripe = Stripe('pk_test_51RYO3APnabtqgpvozmeYrG7muzrbDL7gCWqCc8SpdxGqrjvE58CLTY7uegD25SsI5pZuYk3lwQeUuNDDE6BoP2Da00XxmU2BD8'); 
                    
                    // <-- ATUALIZE AQUI com o URL do seu servidor -->
                    const serverUrl = 'https://fpimentel35.github.io/lynkn.me/'; 
                    
                    const response = await fetch(`${serverUrl}/create-payment-intent`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: this.userId, userEmail: this.auth.currentUser.email })
                    });
                    const { clientSecret } = await response.json();

                    this.elements = this.stripe.elements({ clientSecret });
                    const paymentElement = this.elements.create("payment");
                    paymentElement.mount("#payment-element");

                    const form = document.getElementById('payment-form');
                    form.addEventListener('submit', async (e) => {
                        e.preventDefault();

                        document.getElementById('submit-payment').disabled = true;
                        document.getElementById('spinner').style.display = 'inline';
                        document.getElementById('button-text').style.display = 'none';

                        const { error } = await this.stripe.confirmPayment({
                            elements: this.elements,
                            confirmParams: {
                                return_url: `${window.location.origin}/sucesso.html`, // <-- ATUALIZE AQUI
                            },
                        });

                        if (error) {
                            const messageContainer = document.getElementById('payment-message');
                            messageContainer.textContent = error.message;
                            messageContainer.style.display = 'block';
                            document.getElementById('submit-payment').disabled = false;
                            document.getElementById('spinner').style.display = 'none';
                            document.getElementById('button-text').style.display = 'inline';
                        }
                    });
                },

                addBioLinkField() {
                    this.bioPage.links.push({ title: '', url: '', icon: 'none' });
                },

                removeBioLinkField(index) {
                    this.bioPage.links.splice(index, 1);
                },

                async deleteLink(linkId) {
                    try {
                        const linkDoc = doc(this.db, 'artifacts', this.appId, 'users', this.userId, 'links', linkId);
                        await deleteDoc(linkDoc);
                        this.showNotification("Link apagado.");
                    } catch (error) {
                         this.showNotification(`Erro ao apagar o link: ${error.message}`);
                    }
                },
                
                showAnalytics(link) {
                    if (this.userPlan === 'premium') {
                        this.selectedLink = link;
                        this.modalContent = 'analytics';
                        this.showModal = true;
                    } else {
                        this.showNotification("Análise de cliques é um recurso Premium.");
                    }
                },
                
                getBioBackground() {
                    const background = this.bioPage.background;
                    const isPremium = this.userPlan === 'premium';

                    if (background.startsWith('#')) {
                        return background;
                    }
                    
                    switch(background) {
                        case 'gradient1': return isPremium ? 'linear-gradient(to right, #6EE7B7, #3B82F6)' : '#FFFFFF';
                        case 'gradient2': return isPremium ? 'linear-gradient(to right, #EC4899, #F59E0B)' : '#FFFFFF';
                        case 'gradient3': return isPremium ? 'linear-gradient(to right, #A78BFA, #4F46E5)' : '#FFFFFF';
                        default: return '#FFFFFF'; 
                    }
                },

                getBioButtonStyleClass() {
                    const style = this.bioPage.buttonStyle;
                    switch(style) {
                        case 'square': return 'rounded-md';
                        case 'rounded': return 'rounded-full';
                        case 'dotted': return 'rounded-lg border-2 border-dashed';
                        default: return 'rounded-lg';
                    }
                },
                
                getBioButtonColor() {
                    if (this.bioPage.buttonColor !== 'default') {
                        return this.bioPage.buttonColor;
                    }
                    return '#4f46e5'; // Default site color (indigo-600)
                },
                
                getButtonTextColor(hex) {
                    if (!hex || hex === 'default') hex = '#4f46e5';
                    if(!hex.startsWith('#')) return '#FFFFFF'; 
                    
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                    return (yiq >= 128) ? '#000000' : '#FFFFFF';
                },
                
                getPreviewTextColor(bg) {
                     if (!bg || !bg.startsWith('#')) return 'text-gray-800'; 
                     const r = parseInt(bg.slice(1, 3), 16);
                     const g = parseInt(bg.slice(3, 5), 16);
                     const b = parseInt(bg.slice(5, 7), 16);
                     const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
                     return (yiq >= 128) ? 'text-gray-800' : 'text-gray-200';
                },

                getSocialIcon(name) {
                    const icons = {
                        link: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>`,
                        whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004l-1.03 3.766l3.844-1.041z"/></svg>`,
                        instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
                        tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.81-1.75-1.76-2.59-4.18-2.6-6.75v-.02c.02-2.18.9-4.33 2.51-5.91s3.81-2.48 5.99-2.54c.05 1.52.1 3.04.1 4.56v.02c-.8-.01-1.59.12-2.35.43-.9.38-1.67.92-2.26 1.61-.63.72-1.03 1.61-1.16 2.54v.02c-.02.63-.01 1.27.04 1.9.05.65.24 1.28.52 1.86.33.7.8 1.29 1.39 1.79.49.42 1.06.74 1.68.95.63.22 1.29.31 1.96.28.01-2.26.01-4.52.01-6.78z"/></svg>`,
                        facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
                        x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
                        email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.946 9.315c.522-.174 1.103-.349 1.714-.533 2.441-.741 5.378-1.135 8.342-1.135s5.901.394 8.342 1.135c.611.183 1.192.359 1.714.533a1.5 1.5 0 01.954 1.486v6.385a1.5 1.5 0 01-.954 1.486c-.522.174-1.103.349-1.714.533-2.441.741-5.378 1.135-8.342 1.135s-5.901-.394-8.342-1.135c-.611-.183-1.192-.359-1.714-.533A1.5 1.5 0 010 17.186V10.801a1.5 1.5 0 01.954-1.486zM12 15.632a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"/></svg>`,
                        none: ''
                    };
                    return icons[name] || '';
                },

                generateRandomSlug(length = 6) {
                    return Math.random().toString(36).substring(2, 2 + length);
                },

                showNotification(message) {
                    this.notification.message = message;
                    this.notification.show = true;
                    setTimeout(() => {
                        this.notification.show = false;
                    }, 3000);
                },

                setCreatorMode(mode) {
                    this.creatorMode = mode;
                    this.updateMetaTags(mode);
                },

                updateMetaTags(mode) {
                    const titleEl = document.querySelector('title');
                    const descEl = document.querySelector('meta[name="description"]');
                    if(mode === 'link') {
                        titleEl.textContent = "Encurtador de Links - lynkn.me";
                        descEl.setAttribute('content', 'Encurte e personalize URLs longas de forma rápida e fácil. Monitore seus links com a nossa ferramenta.');
                    } else { // bio
                        titleEl.textContent = "Crie sua Página Link na Bio - lynkn.me";
                        descEl.setAttribute('content', "Agrupe todos os seus links importantes numa única página de 'Link na Bio' personalizada. Ideal para redes sociais.");
                    }
                }
            }
        }
    </script>
</body>
</html>
