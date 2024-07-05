
import { LucidModel, ModelAttributes } from '@adonisjs/lucid/types/model';
import { ModelStatus } from '../../types/enum.js';

export class DatabaseService<T extends LucidModel>{
  constructor(private model: T) {}

  public getModel(){
    return this.model
  }

  public async findAll(): Promise<InstanceType<T>[]> {
    return this.model.all();
  }

  public async findById(id: number | string): Promise<InstanceType<T> | null> {
    return this.model.find(id);
  }

  public async store(data: Partial<InstanceType<T>>): Promise<InstanceType<T>> {
    const instance = new this.model();
    return await instance.merge(data).save() as InstanceType<T>;
  }

  public async update(id: number | string, data: Partial<InstanceType<T>>): Promise<InstanceType<T>> {
    const instance = await this.model.findOrFail(id);
    instance.merge(data as Partial<ModelAttributes<InstanceType<T>>>);
    await instance.save();
    return instance;
  }

  public async destroy(id: number | string): Promise<void> {
    const instance = await this.model.findOrFail(id);
    instance.$original.status = ModelStatus.deleted
    await instance.save()
  }
}
