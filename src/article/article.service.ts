import {
  Injectable,
} from '@nestjs/common';
import {
  ArticleDto
} from './dto';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly userRepository: Repository<Article>,
  ) {}

  async add(
    articleDto: ArticleDto,
  ): Promise<any> {
    const {
      Description,
      Price,


    } = articleDto;

    const user = this.userRepository.create({
      Description,
      Price,



    });

    const savedUser =
      await this.userRepository.save(user);

    return savedUser;
  }

  async update(id: string, articleDto: ArticleDto,): Promise<Article | null> {

    const article = await this.userRepository.findOne({ where: { id: id } });

    if (!article) {
      return null; 
    }

    article.Description = articleDto.Description;
    article.Price = articleDto.Price;



    const updatedArticle = await this.userRepository.save(article);
    return updatedArticle;
    

  }

  async delete(id: string): Promise<Article | null> {

    const article = await this.userRepository.findOne({ where: { id: id } });

    if (!article) {
      return null; 
    }
    
   await this.userRepository.remove(article);  
   return article  

  }

  async getAll(): Promise<Article[]> {
    const article = await this.userRepository.find();
    return article;
  }
}
