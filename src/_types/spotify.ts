export interface CurrentSong {
    progress_ms: number;
    timestamp: number;
    item: Item;
    is_playing: boolean;
}

export interface Item {
    name: string;
    duration_ms: number;
    preview_url: string;
    album: Album;
    artists: Artist[];
    external_urls: ExternalUrls;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    external_urls: ExternalUrls;
    images: Image[];
    name: string;
    uri: string;
}

export interface Artist {
    external_urls: ExternalUrls;
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
