import { Writable } from 'stream';

class LineBufferWritableStream extends Writable {
  private buffer: string;
  private readonly lines: string[];

  constructor() {
    super();
    this.buffer = '';
    this.lines = [];
  }

  _write(chunk: any, _encoding: string, callback: () => void) {
    // Append chunk to buffer
    this.buffer += chunk.toString();

    let newlineIndex: number;
    while ((newlineIndex = this.buffer.indexOf('\n')) >= 0) {
      // Extract a line from the buffer
      const line = this.buffer.slice(0, newlineIndex + 1).trim();
      // Add the line to the lines array
      this.lines.push(line);
      // Remove the processed line from the buffer
      this.buffer = this.buffer.slice(newlineIndex + 1);
    }

    callback();
  }

  getLines(): string[] {
    // Return the collected lines
    return this.lines;
  }

  _final(callback: (error?: Error | null) => void) {
    // If there is any remaining data in the buffer, add it as the last line
    if (this.buffer.length > 0) {
      this.lines.push(this.buffer.trim());
    }
    callback();
  }
}

export default LineBufferWritableStream;
