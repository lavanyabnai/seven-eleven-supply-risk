import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

interface UploadButtonProps {
  onUpload: (data: unknown) => void;
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const { CSVReader } = useCSVReader();
  // const { shouldBlock, triggerPaywall } = usePaywall();

  // if (true) {
  // // if (shouldBlock) {
  //   return (
  //     <Button
  //       size="sm"
  //       className="w-full lg:w-auto"
  //       // onClick={triggerPaywall}
  //     >
  //       <Upload className="size-4 mr-2" />
  //       Import
  //     </Button>
  //   );
  // }


  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          size="sm"
          className="w-full lg:w-auto"
          {...getRootProps()}
        >
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
}
