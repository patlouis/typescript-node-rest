import { Router, Request, Response } from 'express';

const router = Router();

interface Book {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
}

const books: Book[] = [
    {id: 1, title: '1984', author: 'George Orwell', publishedYear: 1949},
    {id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960},
    {id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925}
]

// Get all books
router.get('/books', (req: Request, res: Response) => {
    res.json(books);
});

router.get('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Add a new book
router.post('/books', (req: Request, res: Response) => {
    const newBook: Book = req.body;
    newBook.id = books.length + 1;
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book
router.put('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const updatedBook: Book = req.body;
        updatedBook.id = bookId;
        books[bookIndex] = updatedBook;
        res.json(updatedBook);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Delete a book
router.delete('/books/:id', (req: Request, res: Response) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

export default router;