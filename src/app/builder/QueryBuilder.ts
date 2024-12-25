import { Query } from "mongoose";

class QueryBuilder<T> {
    public QueryModel: Query<T[], T>;
    public query: Record<string, unknown>;


    constructor(QueryModel: Query<T[], T>, query: Record<string, unknown>) {
        this.QueryModel = QueryModel;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this.query.searchTerm) {
            this.QueryModel = this.QueryModel.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: this.query.searchTerm as string, $options: 'i' }
                }))
            });
        }
        return this;
    }

    filter() {
        const queryObject = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

        excludeFields.forEach((field) => delete queryObject[field]);

        this.QueryModel = this.QueryModel.find(queryObject);
        return this;
    }

    sort() {
        const sort = (this.query.sort as string)?.split(',').join(' ') || '-createdAt';
        this.QueryModel = this.QueryModel.sort(sort);
        return this;
    }

    paginate() {
        const page = Number(this.query.page || 1);
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.QueryModel = this.QueryModel.skip(skip).limit(limit);
        return this;
    }

    fields() {
        const fields = (this.query.fields as string)?.split(',').join(' ') || '-__v';
        this.QueryModel = this.QueryModel.select(fields);
        return this;
    }




}

export default QueryBuilder;
