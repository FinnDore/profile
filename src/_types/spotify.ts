export interface CurrentSong {
    progressMs: number;
    timestamp: number;
    item: Item;
    isPlaying: boolean;
}

export interface Item {
    name: string;
    durationMs: number;
    previewUrl: string;
    album: Album;
    artists: Artist[];
    externalUrls: ExternalUrls;
}

export interface Album {
    albumType: string;
    artists: Artist[];
    externalUrls: ExternalUrls;
    images: Image[];
    name: string;
    uri: string;
}

export interface Artist {
    externalUrls: ExternalUrls;
    href: string;
    name: string;
    uri: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}
