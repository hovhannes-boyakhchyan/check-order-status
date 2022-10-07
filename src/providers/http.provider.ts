import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HttpProvider {
  constructor(private readonly httpService: HttpService) {}

  request(config: AxiosRequestConfig): Promise<any> {
    return firstValueFrom(
      this.httpService.request(config).pipe(
        catchError((e) => {
          console.error(
            '----------------ERROR----------------',
            e.response.data,
          );
          throw new HttpException(e.response.data.message, e.response.status);
        }),
        map((res: AxiosResponse) => res.data),
      ),
    );
  }
}
