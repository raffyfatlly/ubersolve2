import * as XLSX from 'xlsx';
import { createChatCompletion } from './openai';

export const processFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  const reader = new FileReader();

  try {
    if (fileType === 'application/pdf') {
      return await processPDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
               fileType === 'application/vnd.ms-excel') {
      return await processExcel(file);
    } else if (fileType === 'text/plain') {
      return await processText(file);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
};

const processPDF = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await import('pdf-parse');
        const data = await pdf.default(typedarray);
        resolve(data.text);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const processExcel = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let result = '';
        workbook.SheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          result += `Sheet: ${sheetName}\n${JSON.stringify(json, null, 2)}\n\n`;
        });
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

const processText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export const generateTrainingSummary = async (fileContent: string): Promise<string> => {
  try {
    const response = await createChatCompletion([
      {
        role: 'system',
        content: 'You are an AI assistant that helps summarize and extract key information from documents. Create a concise summary that can be used as training data.'
      },
      {
        role: 'user',
        content: `Please analyze this content and create a summary that captures the key information: ${fileContent}`
      }
    ], 'gpt-4');

    return response.content || '';
  } catch (error) {
    console.error('Error generating training summary:', error);
    throw error;
  }
};