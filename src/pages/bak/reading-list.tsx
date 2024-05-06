const readingList = [
  {
    url: "https://www.brendonovich.dev/blog/the-ultimate-form-abstraction",
    text: "The Ultimate Form Abstraction",
    author: "Brendan",
    authorUrl: "https://www.brendonovich.dev/",
  },
  {
    url: "https://www.youtube.com/watch?v=EWEobZQD4D8&t=69s",
    text: "WTF Is... Corepack?",
    author: "Christian Ivicevic",
    authorUrl: "https://github.com/ChristianIvicevic",
  },
  {
    url: "https://www.nexxel.dev/blog/wsl-workflow",
    text: "Nexxels setup",
    author: "Nexxel",
    authorUrl: "https://www.nexxel.dev/",
  },
  {
    url: "https://www.youtube.com/watch?v=O6xtMrDEhcE",
    text: "The World Beyond Components",
    author: "Ryan solid",
    authorUrl: "https://twitter.com/RyanCarniato",
  },
  {
    url: "https://tkdodo.eu/blog/practical-react-query",
    text: "Practical React Query",
    author: "TK dodo",
    authorUrl: "ihttps://twitter.com/tkdodo",
  },
  {
    url: "https://medium.com/@cfatechblog/bare-metal-k8s-clustering-at-chick-fil-a-scale-7b0607bd3541",
    text: "Bare Metal K8s Clustering at Chick-fil-A Scale",
  },
  {
    url: "https://thebookofshaders.com/00/",
    text: "The Book of Shaders",
    author: "patricio gonzalez vivo",
    authorUrl: "https://patriciogonzalezvivo.com/",
  },
  {
    url: "https://www.warp.dev/blog/what-happens-when-you-open-a-terminal-and-enter-ls",
    text: "What happens when you open a terminal and enter ls",
  },
  {
    url: "https://www.warp.dev/blog/using-tree-data-structures-to-implement-terminal-split-panes-more-fun-than-it-sounds",
    text: "Using tree data structures to implement terminal split panes",
  },
  {
    url: "https://fasterthanli.me/articles/lies-we-tell-ourselves-to-keep-using-golang",
    text: "Lies we tell ourselves to keep using Golang",
    author: "fasterthanlime",
    authorUrl: "https://twitter.com/fasterthanlime",
  },
  {
    url: "https://kentcdodds.com/blog/colocation",
    text: "Colocation",
    author: "Kent C. Dodds",
    authorUrl: "https://twitter.com/kentcdodds",
  },
  {
    url: "https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/",
    text: "How we built Pingora, the proxy that connects Cloudflare to the Internet",
  },
  {
    url: "https://planetscale.com/blog/mysql-data-types-varchar-and-char",
    text: "MySQL Data Types: VARCHAR and CHAR",
  },
  {
    url: "https://splitbee.io/blog/why-we-moved-from-stripe-to-paddle",
    text: "Why we moved from Stripe to Paddle",
    author: "Tobias Lins",
    authorUrl: "https://twitter.com/linstobias",
  },
];

export default function ReadingList() {
  return (
    <div className="flex">
      <div className="mx-auto w-full max-w-[65ch]">
        <h1 className="mt-12 mb-2 text-4xl font-bold text-primary">
          My reading list
        </h1>
        {readingList.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="mr-2 underline"
              rel="noreferrer"
              target="_blank"
            >
              {item.text}
            </a>
            {item.author && item.authorUrl && (
              <>
                -
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="ml-2 opacity-75"
                  href={item.authorUrl}
                >
                  {item.author}
                </a>
              </>
            )}
          </li>
        ))}
      </div>
    </div>
  );
}
