import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropZone from '@components/shared/dropzone';

describe('DropZone', () => {
  it('Should render Dropzone', () => {
    const onDrop = jest.fn();
    render(
      <DropZone onDrop={onDrop}>
        <div>Content</div>
      </DropZone>
    );

    const content = screen.getByText('Content');
    expect(content).toBeInTheDocument();
  });

  it('Should render Dropzone and raise onDrop event', () => {
    const onDrop = jest.fn();
    render(
      <DropZone onDrop={onDrop}>
        <div>Content</div>
      </DropZone>
    );

    const content = screen.getByText('Content').parentElement;
    let fileList = new File([new ArrayBuffer(2e5)], 'test-file.jpg', {
      type: 'image/jpeg',
    });
    if (content) {
      fireEvent.drop(content, {
        dataTransfer: {
          files: [fileList],
        },
      });

      fireEvent.dragOver(content);
      fireEvent.dragEnter(content);
      fireEvent.dragLeave(content);

      expect(onDrop).toBeCalledTimes(1);
    }
  });
});
