import Attachments from '@components/shared/attachment';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Attachments', () => {
  it('Should render attachment - Existing', () => {
    const path = 'https://google.com';
    const fileName = 'Testfile.jpg';
    const onDelete = jest.fn;
    render(
      <Attachments
        index={0}
        name={fileName}
        existing={true}
        path={path}
        onDelete={onDelete}
        thumbnailUrl=''
      />
    );
    const spans = screen.getAllByText(fileName);
    const toolTip = spans[0];
    const fileDisplayName = spans[1];
    expect(toolTip).toBeInTheDocument();
    expect(fileDisplayName).toBeInTheDocument();
  });

  it('Should render attachment - New', () => {
    const path = 'https://google.com';
    const fileName = 'Testfile.jpg';

    render(
      <Attachments index={0} name={fileName} existing={false} path={path} />
    );
    const spans = screen.getAllByText(fileName);
    const toolTip = spans[0];
    const fileDisplayName = spans[1];

    expect(toolTip).toBeInTheDocument();
    expect(fileDisplayName).toBeInTheDocument();
  });

  it('Should invoke the delete method with given index', () => {
    const path = 'https://google.com';
    const fileName = 'Testfile.jpg';
    const onDelete = jest.fn();
    render(
      <Attachments
        index={0}
        name={fileName}
        //existing={false}
        path={path}
        onDelete={onDelete}
      />
    );
    const deleteBtn = screen.getByTestId('deleteBtn');
    fireEvent.click(deleteBtn, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });
    expect(onDelete).toBeCalledTimes(1);
    expect(onDelete).toBeCalledWith(0);
  });

  it('Should invoke the delete method with out providing delete functionality', () => {
    const path = 'https://google.com';
    const fileName = 'Testfile.jpg';
    const onDelete = jest.fn();
    render(
      <Attachments
        index={0}
        name={fileName}
        //existing={false}
        path={path}
        //onDelete={onDelete}
      />
    );
    const deleteBtn = screen.getByTestId('deleteBtn');
    fireEvent.click(deleteBtn, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });
    expect(onDelete).toBeCalledTimes(0);
  });

  it('Should invoke the open button click', () => {
    const path = 'https://google.com';
    const fileName = 'Testfile.jpg';
    const open = window.open;
    window.open = jest.fn();

    render(
      <Attachments
        index={0}
        name={fileName}
        existing={true}
        path={path}
        thumbnailUrl=''
      />
    );
    const openBtn = screen.getByTestId('openBtn');
    fireEvent.click(openBtn, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn(),
    });
    expect(window.open).toBeCalled();
    expect(window.open).toBeCalledWith(path);
    window.open = open;
  });
});
