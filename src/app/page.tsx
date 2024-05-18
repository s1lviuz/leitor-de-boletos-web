import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-5 text-justify">
      <p className="mb-6">
        📄 Extraia facilmente a linha digitável de qualquer boleto a partir de arquivos PDF ou imagens.
      </p>
      <p className="mb-6">
        📋 Nossa aplicação é projetada para simplificar sua vida financeira. Com apenas alguns cliques, você pode obter a linha digitável de qualquer boleto e realizar seus pagamentos de forma rápida e eficiente.
      </p>
      <p className="mb-6">
        ✅ Não dependa mais dos aplicativos bancários. Experimente nossa solução confiável e segura para gerenciar seus boletos com facilidade.
      </p>
      <Link href="/leitor-boleto">
        <div className="mt-6 px-4 py-2 w-fit mx-auto bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
          Começar 🚀
        </div>
      </Link>
    </div>
  );
}
