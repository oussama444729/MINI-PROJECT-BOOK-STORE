package com.oussamabi.bookstore.repository;



import com.oussamabi.bookstore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {}