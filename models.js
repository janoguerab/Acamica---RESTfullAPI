class Author {
    constructor(id,name,lastName,birthdate){
        this.id        = id;
        this.name      = name;
        this.lastName  = lastName;
        this.birthdate = birthdate;
    }
}

class Book {
    constructor(id,title,description,year){
        this.id          = id;
        this.title       = title;
        this.description = description;
        this.year        = year;
    }
}

module.export = {Author, Book}