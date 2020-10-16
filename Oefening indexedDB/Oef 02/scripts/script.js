/// <reference path= "jquery-3.4.1.js" />

window.indexedDB =
    window.indexedDB ||
    window.webkitIndexedDB ||
    window.mozIndexedDB ||
    window.msIndexedDB;

$(document).ready(function() {
    bookNamespaces.initialize();
});

(function() {
    this.bookNamespaces = this.bookNamespaces || {};
    var ns = this.bookNamespaces;
    var db;
    var currentRecord;

    ns.initialize = function() {
        var btnAdd = document.getElementById("btnAdd");
        btnAdd.addEventListener("click", function(e) {
            ns.save();
            e.preventDefault();
        });
        var request = indexedDB.open("book_Library", 1);

        request.onupgradeneeded = function(response) {
            var option = { keypath: "id", autoIncrement: true };
            var result = response.target.result;
            var store = result.createObjectStore("books", option);
            store.createIndex("author", "author", { unique: false });
            store.createIndex("DC", "DC", { unique: false });
            store.createIndex("Marvel", "Marvel", { unique: false });
        };

        request.onsuccess = function(response) {
            db = request.result;
            ns.showBooks();
        };
    };

    ns.save = function() {
        var book = currentRecord.book;
        book.title = $("#title").val();
        book.author = $("#author").val();
        book.year = $("#year").val();
        book.volume = $("#volume").val();
        if (select("company") !== "DC") {
            book.Marvel = "Marvel";
            delete book.DC;
        } else {
            book.DC = "DC";
            delete book.Marvel;
        }

        var tx = db.transaction("books", "readwrite");
        var books = tx.objectStore("books");
        var request =
            currentRecord.key != null
                ? books.put(book, currentRecord.key)
                : books.add(book);

        request.onsuccess = function(response) {
            ns.showBooks();
        };
    };

    ns.showBooks = function() {
        $("#currentAction").html("Add Book");
        currentRecord = { key: null, book: {} };
        displayCurrentBooks();
        var tx = db.transaction("books", "readonly");
        var books = tx.objectStore("books");
        var request = books.openCursor();
        var result = [];

        request.onsuccess = function(response) {
            var cursor = response.target.result;

            if (!cursor) {
                bindToGrid(result);
                return;
            }

            result.push({ key: cursor.key, book: cursor.value });
            cursor.continue();
        };
    };

    function bindToGrid(result) {
        var html = "";
        for (var i = 0; i < result.length; i++) {
            var key = result[i].key;
            var book = result[i].book;
            var x = book.hasOwnProperty("DC") ? book.DC : book.Marvel;
            html += "<tr><td>" + book.title + "</td><td>";
            html += book.author + "</td><td>" + book.year;
            html += "</td><td>" + book.volume + "</td>";
            html += "<td>" + x + "</td><td>";
            html += "   <a class='edit' href='#' data-key = ";
            html += key + " >Edit</a></tr>";
        }
        html = html || "<tr><td colspan='5'>there is no book</td></tr>";
        $("#booksTable tbody").html(html);
        $("#booksTable a.edit").on("click", ns.loadBook);
        $("#booksTable a.delete").on("click", ns.delete);
    }

    ns.loadBook = function() {
        var key = parseInt($(this).attr("data-key"));
        var tx = db.transaction("books", "readonly");
        var books = tx.objectStore("books");
        var request = books.get(key);

        request.onsuccess = function(response) {
            $("#currentAction").html("Edit Book");
            currentRecord = { key: key, book: response.target.result };
            displayCurrentBooks();
        };
    };

    function displayCurrentBooks() {
        var book = currentRecord.book;
        lastP = Object.keys(book);
        $("#title").val(book.title);
        $("#author").val(book.author);
        $("#year").val(book.year);
        $("#volume").val(book.volume);
        $("#company").val(book[lastP[lastP.length - 1]]);
    }

    function select(el) {
        let elem = document.getElementById(el);

        for (var i = 0; i < elem.length; i++) {
            if (elem[i].selected) {
                return elem[i].value;
            }
        }
    }
})();
