import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Comment, { IComment } from '@components/shared/comment';

jest.mock('@components/shared/ckeditor5', () => {
  return {
    __esModule: true,
    default: ({
      name,
      value,
      disabled = false,
      onChange,
    }: {
      name: string;
      value: string;
      disabled: boolean;
      onChange: Function;
    }) => {
      return (
        <input
          data-testid='ckeditor5'
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
      );
    },
  };
});

describe('Comment', () => {
  it('Should render Comment - view', () => {
    const comments: IComment[] = [
      {
        comment: 'This is first comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
      {
        comment: 'This is second comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
    ];
    render(<Comment type='view' ticketId='123' comments={comments} />);
    const commentsDiv = screen.getAllByTestId('comment');
    expect(commentsDiv.length == 2).toBeTruthy();
  });

  it('Should render Comment - view, no commnets', () => {
    const comments: IComment[] = [];
    render(<Comment type='view' ticketId='123' comments={comments} />);
    const noCommentDiv = screen.getByTestId('noComment');
    expect(noCommentDiv).toBeInTheDocument();
  });

  it('Should render Comment - view, edit click', async () => {
    const onEdit = jest.fn();
    const comments: IComment[] = [
      {
        comment: 'This is first comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
      {
        comment: 'This is second comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
    ];
    render(
      <Comment
        type='view'
        ticketId='123'
        comments={comments}
        onEditClick={onEdit}
      />
    );
    const btnEdit = screen.getByTestId('btnEdit');
    await waitFor(() => {
      fireEvent.click(btnEdit, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      expect(onEdit).toBeCalledTimes(1);
    });
  });

  it('Should render Comment - view, edit click without passing onEdit method', async () => {
    const onEdit = jest.fn();
    const onCancel = jest.fn();
    const comments: IComment[] = [
      {
        comment: 'This is first comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
      {
        comment: 'This is second comment.',
        createdBy: 'Mohammed Shabeeb',
        createdDate: new Date(),
        ticketId: '123',
      },
    ];
    render(
      <Comment
        type='view'
        ticketId='123'
        comments={comments}
        //onEditClick={onEdit}
        onCancel={onCancel}
      />
    );
    const btnEdit = screen.getByTestId('btnEdit');
    await waitFor(() => {
      fireEvent.click(btnEdit, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      expect(onEdit).toBeCalledTimes(0);
    });
  });

  it('Should render Comment - add, no commnets', async () => {
    const comments: IComment[] = [];
    const onCancel = jest.fn();
    await waitFor(() => {
      render(
        <Comment
          type='add'
          ticketId='123'
          comments={comments}
          onCancel={onCancel}
        />
      );
    });

    await waitFor(() => {
      const noCommentDiv = screen.getByTestId('noComment');
      const addComment = screen.getByTestId('addComment');
      expect(noCommentDiv).toBeInTheDocument();
      expect(addComment).toBeInTheDocument();
    });
  });

  it('Should render Comment and test the add button click', async () => {
    const comments: IComment[] = [];
    const addCommentMethod = jest.fn();
    const onCancel = jest.fn();
    render(
      <Comment
        type='add'
        ticketId='123'
        comments={comments}
        addComment={addCommentMethod}
        onCancel={onCancel}
      />
    );
    const addComment = screen.getByTestId('addComment');
    expect(addComment).toBeInTheDocument();
    const btnAdd = screen.getByText('common:add-comment');
    expect(btnAdd).toBeInTheDocument();
    const editor = screen.getByTestId('ckeditor5');
    await waitFor(() => {
      fireEvent.change(editor, {
        target: {
          value: 'Test comment',
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(btnAdd, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });
    await waitFor(() => {
      expect(addCommentMethod).toBeCalled();
    });
  });

  it('Should render Comment and test the add button click with blank comment', async () => {
    const comments: IComment[] = [];
    const addCommentMethod = jest.fn();
    const onCancel = jest.fn();
    render(
      <Comment
        type='add'
        ticketId='123'
        comments={comments}
        addComment={addCommentMethod}
        onCancel={onCancel}
      />
    );
    const addComment = screen.getByTestId('addComment');
    expect(addComment).toBeInTheDocument();
    const btnAdd = screen.getByText('common:add-comment');
    expect(btnAdd).toBeInTheDocument();
    const editor = screen.getByTestId('ckeditor5');
    await waitFor(() => {
      fireEvent.change(editor, {
        target: {
          value: ' ',
        },
      });
    });
    await waitFor(() => {
      fireEvent.click(btnAdd, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });
    await waitFor(() => {
      expect(addCommentMethod).toBeCalledTimes(0);
    });
  });

  it('Should render Comment and test the cancel button click', async () => {
    const comments: IComment[] = [];
    const onCancel = jest.fn();
    render(
      <Comment
        type='add'
        ticketId='123'
        comments={comments}
        onCancel={onCancel}
      />
    );
    const btnCancel = screen.getByText('common:cancel');

    await waitFor(() => {
      fireEvent.click(btnCancel, {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      });
    });

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });
});
