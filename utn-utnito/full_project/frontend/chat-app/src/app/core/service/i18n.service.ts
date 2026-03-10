import { Injectable } from '@angular/core';

type Locale = 'en' | 'es';

type TranslationParams = Record<string, string | number>;

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly locale: Locale;

  private readonly translations: Record<Locale, Record<string, string>> = {
    en: {
      'login.welcome': 'Welcome to {agentName}',
      'login.signIn': 'Sign in to chat with {agentName}.',
      'login.username': 'Username',
      'login.usernamePlaceholder': 'e.g. carlos.gardel',
      'login.password': 'Password',
      'login.passwordPlaceholder': 'Enter your password',
      'login.invalidCredentials': 'Invalid credentials. Please try again.',
      'login.login': 'Login',
      'login.loggingIn': 'Logging in...',
      'login.programName': 'UTN Programming III',
      'login.academicNote': 'Academic prototype for educational use.',

      'chat.newChat': 'New chat',
      'chat.creating': 'Creating...',
      'chat.createNewChatAria': 'Create a new chat',
      'chat.filterChatsPlaceholder': 'Filter chats...',
      'chat.yourChats': 'Your Chats',
      'chat.noChatsFound': 'No chats found.',
      'chat.renameChatAria': 'Rename chat {title}',
      'chat.archiveChatAria': 'Archive chat {title}',
      'chat.renamePlaceholder': 'Rename chat...',
      'chat.save': 'Save',
      'chat.cancel': 'Cancel',
      'chat.logOut': 'Log out',
      'chat.askAgent': 'Ask {agentName} anything about the course project.',
      'chat.searchInChatPlaceholder': 'Search in this chat...',
      'chat.createOrChoose': 'Create or choose a chat to start working with {agentName}.',
      'chat.loadingMessages': 'Loading messages...',
      'chat.noMessagesMatch': 'No messages match the current search.',
      'chat.startBySending': 'Start by sending a message to {agentName}.',
      'chat.messagePlaceholder': 'Message {agentName}...',
      'chat.send': 'Send',
      'chat.sending': 'Sending...',
      'chat.disclaimer': '{agentName} can make mistakes. Verify critical information.',
      'chat.renameValidation': 'Chat title must be between 3 and 80 characters.',
      'chat.openMenuAria': 'Open menu',
      'chat.closeMenuAria': 'Close menu',
      'chat.defaultUserName': 'UTN User',
    },
    es: {
      'login.welcome': 'Bienvenido a {agentName}',
      'login.signIn': 'Inicia sesión para chatear con {agentName}.',
      'login.username': 'Usuario',
      'login.usernamePlaceholder': 'ej. carlos.gardel',
      'login.password': 'Contraseña',
      'login.passwordPlaceholder': 'Ingresa tu contraseña',
      'login.invalidCredentials': 'Credenciales inválidas. Intenta nuevamente.',
      'login.login': 'Ingresar',
      'login.loggingIn': 'Ingresando...',
      'login.programName': 'UTN Programación III',
      'login.academicNote': 'Prototipo académico para uso educativo.',

      'chat.newChat': 'Nuevo chat',
      'chat.creating': 'Creando...',
      'chat.createNewChatAria': 'Crear un nuevo chat',
      'chat.filterChatsPlaceholder': 'Filtrar chats...',
      'chat.yourChats': 'Tus Chats',
      'chat.noChatsFound': 'No se encontraron chats.',
      'chat.renameChatAria': 'Renombrar chat {title}',
      'chat.archiveChatAria': 'Archivar chat {title}',
      'chat.renamePlaceholder': 'Renombrar chat...',
      'chat.save': 'Guardar',
      'chat.cancel': 'Cancelar',
      'chat.logOut': 'Cerrar sesión',
      'chat.askAgent': 'Pregúntale a {agentName} lo que quieras sobre el proyecto del curso.',
      'chat.searchInChatPlaceholder': 'Buscar en este chat...',
      'chat.createOrChoose': 'Crea o elige un chat para empezar a trabajar con {agentName}.',
      'chat.loadingMessages': 'Cargando mensajes...',
      'chat.noMessagesMatch': 'No hay mensajes que coincidan con la búsqueda actual.',
      'chat.startBySending': 'Empieza enviando un mensaje a {agentName}.',
      'chat.messagePlaceholder': 'Mensaje para {agentName}...',
      'chat.send': 'Enviar',
      'chat.sending': 'Enviando...',
      'chat.disclaimer': '{agentName} puede cometer errores. Verifica la información importante.',
      'chat.renameValidation': 'El título del chat debe tener entre 3 y 80 caracteres.',
      'chat.openMenuAria': 'Abrir menú',
      'chat.closeMenuAria': 'Cerrar menú',
      'chat.defaultUserName': 'Usuario UTN',
    },
  };

  constructor() {
    this.locale = this.detectLocale();
  }

  public getCurrentLocale(): Locale {
    return this.locale;
  }

  public t(key: string, params?: TranslationParams): string {
    const text = this.translations[this.locale][key] || this.translations.en[key] || key;

    if (!params) {
      return text;
    }

    return text.replace(/\{(\w+)\}/g, (_match, token: string) => {
      const value = params[token];
      return value === undefined ? `{${token}}` : String(value);
    });
  }

  private detectLocale(): Locale {
    if (typeof navigator === 'undefined') {
      return 'en';
    }

    const locales = navigator.languages?.length ? navigator.languages : [navigator.language];
    const hasSpanishLocale = locales.some((locale) =>
      typeof locale === 'string' && locale.toLowerCase().startsWith('es'),
    );

    return hasSpanishLocale ? 'es' : 'en';
  }
}
