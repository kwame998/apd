import { makeExecutableSchema, addMockFunctionsToSchema, MockList } from 'graphql-tools';
import { graphql, GraphQLScalarType, Kind } from 'graphql';
import Mock from 'mockjs';

const { Random } = Mock;

const typeDefs = `
  enum DATASTATE {
    NEW
    DELETE
    UPDATE
    NONE
  }
  enum SORTVALUE {
    ASC
    DESC
  }
  scalar Date
  input Pagination{
    currentPage: Int
    pageSize: Int
  }
  input SortItem{
    field: String
    value: SORTVALUE
  }
  type EquipmentList {
    list: [Equipment]
    count: Int
  }
  type Equipment {
    id: ID
    eqNum: String
    desc: String
    status: Int
  }
  type ItemList {
    list: [Item]
    count: Int
  }
  type Item {
    id: ID
    itemNum: String
    desc: String
    amount: Int
    cost: Int
  }
  type PersonList {
    list: [Person]
    count: Int
  }
  type Person {
    id: ID
    personID: String
    name: String
    email: String
  }
  type WorkorderList {
    list: [Workorder]
    count: Int
  }
  type Workorder {
    id: ID
    woNum: String
    desc: String
    created_by: Person
    created_time: Date
    status: Int
    assocEQ(pagination:Pagination, where:String, sorter: [SortItem]): EquipmentList
    assocItem(pagination:Pagination, where:String, sorter: [SortItem]): ItemList
    assocPerson(pagination:Pagination, where:String, sorter: [SortItem]): PersonList
  }
  type Query {
    workorder_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : WorkorderList
    workorder_findOne(app:String!, id:ID!) : Workorder
    equipment_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : EquipmentList
    equipment_findOne(app:String!, id:ID!) : Equipment
    item_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : ItemList
    item_findOne(app:String!, id:ID!) : Item
    person_find(app:String!, pagination:Pagination, where:String, sorter: [SortItem]) : PersonList
    person_findOne(app:String!, id:ID!) : Person
  }
`;

const typeResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};

const min = 100;
const max = 9999;

const mocks = {
  ID: () => Random.guid(),
  Int: () => Random.natural(min, max),
  Float: () => Random.float(min, max),
  String: () => Random.ctitle(10, 5),
  Date: () => Random.date(),
  Boolean: () => Random.natural(0, 1),
  Pagination: () => ({
    currentPage: 1,
    pageSize: 10,
  }),
  Query: () => ({
    workorder_find: (self,{app,pagination:{ pageSize }}) => ({
      list: () => new MockList(pageSize || 10, () => ({
        woNum: () => 'WO' + Random.integer(100, 999),
        status: ()=> Random.integer(0, 1),
      })),
      count: () => 100,
    }),
    workorder_findOne: (self,{app,id}) => ({
      woNum: () => 'WO' + Random.integer(100, 999),
      status: () => Random.natural(0, 1),
      created_by: () => ({
        personID: () => Random.first(),
        name: ()=> Random.cname(),
        email: ()=> Random.email()
      }),
      assocEQ: () => ({
        list: () => new MockList(5),
        count: () => 20,
      }),
      assocItem: () => ({
        list: () => new MockList(5,() => ({
          itemNum: () => 'ITEM' + Random.integer(100, 999),
          desc: () => Random.cword(10),
          amount: () => Random.integer(10,20),
          cost: () => Random.integer(100,500),
        })),
        count: () => 20,
      }),
      assocPerson: () => ({
        list: () => new MockList(5,() => ({
          personID: () => Random.first(),
          name: ()=> Random.cname(),
          email: ()=> Random.email()
        })),
        count: () => 20,
      })
    }),
    equipment_find: (self,{app,pagination:{ pageSize }}) => {
      return ({
      list: () => new MockList(pageSize || 10, () => ({
        eqNum: () => 'EQ' + Random.integer(100, 999),
        status: ()=> Random.integer(0, 1)
      })),
      count: () => 100,
    })},
    item_find: (self,{app,pagination:{ pageSize }}) => {
      return ({
        list: () => new MockList(pageSize || 10, () => ({
          itemNum: () => 'ITEM' + Random.natural(100, 999),
          desc: () => Random.cword(10)
        })),
        count: () => 100,
      })},
    person_find: (self,{app,pagination:{ pageSize }}) => {
      return ({
        list: () => new MockList(pageSize || 10, () => ({
          personID: () => Random.name(),
          name: ()=> Random.cname(),
          email: ()=> Random.email()
        })),
        count: () => 100,
      })},
  }),
};

const schema = makeExecutableSchema({
  typeDefs,
  typeResolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

addMockFunctionsToSchema({ schema, mocks, preserveResolvers: true });

function graphqlQuery(req, res) {
  const { query, variables } = req.body;
  graphql(schema, query, null, null, variables).then(result => {
    return res.json(result);
  });
}

const proxy = {
  'POST /api/graphql': graphqlQuery,
};

export default proxy;
