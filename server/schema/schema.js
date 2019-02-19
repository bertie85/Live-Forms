const graphql = require("graphql");
const _ = require("lodash");

// Import the models for the resolve methods
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;


const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
        type: AuthorType,

        resolve(parent, args) {
          return Author.findById(parent.authorId);
        }
      }
    })
  }
);

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      age: {type: GraphQLInt},
      books: {
        type: new GraphQLList(BookType),

        resolve(parent, args) {
          // return _.filter(books, {authorId: parent.id})
          return Book.find({authorId: parent.id});
        }
      }
    })
  }
);

// The root query defines how we can jump into the graphs to query data.
// 'Merrol tamadjuk az adatot'
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},

      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},

      resolve(parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),

      resolve(parent, agrs) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),

      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
      },

      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });

        // This is awesome!! <- mongoose (the save method also returns the object
        // it saved
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: GraphQLString},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
      },

      resolve(parent, args) {
        const book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId,
        });

        return book.save();
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});