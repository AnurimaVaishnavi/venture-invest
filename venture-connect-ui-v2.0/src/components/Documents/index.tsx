import React, { useState } from "react";
import { Document, Page , pdfjs} from "react-pdf";

export default function PDF(props) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const { pdf } = props;
  pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

  return (
    <Document
      file={pdf}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
