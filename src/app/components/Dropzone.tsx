'use client';

import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderColor: '#ccc',
  borderStyle: 'solid',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function DropzoneComponent() {
  const [retorno, setRetorno] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {
      'application/pdf': []
    },
    onDrop: acceptedFiles => {
      if (acceptedFiles.length === 0) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onload = async () => {
        const pdfBase64 = reader.result?.toString().replace(/^data:application\/pdf;base64,/, '');

        setRetorno('');
        setLoading(true);

        // Enviar o base64 para o backend
        const response = await fetch('https://leitor-de-boletos-api.onrender.com/linha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ file: pdfBase64, mimeType: 'application/pdf' })
        });

        if (!response.ok) {
          alert('Erro ao processar o arquivo');
        }

        const data = await response.json();

        const onlyNumbers = data.linha.replace(/\D/g, '');

        setRetorno(onlyNumbers);

        setLoading(false);
      };
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  } as React.CSSProperties), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <section className="container">
        <div {...getRootProps({ style, className: "bg-[#57C5FB]/15 rounded-xl shadow-lg" })}>
          <input {...getInputProps()} />
          <p>
            Arraste e solte o arquivo PDF do boleto aqui, ou clique para selecionar o arquivo
          </p>
        </div>
      </section>
      <div className="mt-4">
        {loading ? 'Carregando...' : retorno ? <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">Linha digitável:</p>
          {retorno.replace(/d/g, '')}
          <button onClick={() => {
            navigator.clipboard.writeText(retorno)
              .then(() => {
                setCopiado(true);
                setTimeout(() => {
                  setCopiado(false);
                }, 2000);
              });
          }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            {copiado ? 'Copiado ✅' : 'Copiar'}
          </button>
        </div> : null}
      </div>
      <section>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Como usar?</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal list-inside space-y-3">
                <li>
                  <strong>Passo 1:</strong> Prepare seu boleto
                  <p className="ml-4 text-justify xl:text-left">📸 Tire uma foto clara do boleto ou tenha o arquivo PDF pronto. Certifique-se de que a imagem esteja nítida e sem cortes.</p>
                </li>
                <li>
                  <strong>Passo 2:</strong> Faça o upload do arquivo
                  <p className="ml-4 text-justify xl:text-left">🖱️ Clique na área abaixo ou arraste o arquivo do boleto para a área destacada. Vamos processar o arquivo rapidamente para você!</p>
                </li>
                <li>
                  <strong>Passo 3:</strong> Obtenha a linha digitável
                  <p className="ml-4 text-justify xl:text-left">✨ Assim que o processamento for concluído, a linha digitável do boleto será exibida. Use a linha digitável para realizar o pagamento de forma fácil e rápida.</p>
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
