import Image from "next/image";
import DropzoneComponent from "./components/Dropzone";
import { GithubIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-full items-center justify-between bg-[#012A45] text-white">
      <header className="flex flex-col w-full items-center justify-center">
        <Image
          src="/ghost_icon.png"
          alt="Logo"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold">Bem-vindo ao Leitor de Boletos 🎉</h1>
        <p className="text-lg mt-2">🔍 A solução definitiva para leitura de boletos bancários.</p>
      </header>
      <section>
        <DropzoneComponent />
      </section>
      <footer className="flex flex-col w-full items-center justify-center min-h-20">
        <p className="text-lg">Desenvolvido por:</p>
        <div className="flex gap-1 items-center">
          <GithubIcon size={24} />
          <a
            href="https://github.com/s1lviuz"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            <strong>@s1lviuz</strong>
          </a>
        </div>
      </footer>
    </main>
  );
}
