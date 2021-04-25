import { Paginator } from '../../models/paging/paginator.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatementService } from 'src/app/shared/services/statement.service';
import { PageEvent } from '@angular/material';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(public statementService: StatementService, public currency: CurrencyPipe, public store: any) { }
  statementData = new Array<any>();
  viewData = new Array<any>();
  columnsToDisplay = ['sequencia', 'data', 'descricao', 'total', 'saldo'];
  counto: number;
  pageEvent: PageEvent;
  fakePaginator: Paginator;

  limit = 10;
  pages = 0;
  items = 0;

  ngOnInit() {
    this.getStatement();
  }

  onClickCurrency(value: 'R$' | '$') {
    this.currency.transform(this.statementData[0], value === 'R$' ? 'BRL' : 'USD', 'code' )

  }


  fakePaginate(event: Paginator) {
    // console.log(event.pageSize, event.pageIndex);
    console.log((event.pageSize * event.pageIndex) - event.pageSize, event.pageSize * event.pageIndex);
    if (event.pageIndex === 0 || event.pageIndex === 1) {
      this.viewData = this.statementData.slice(
        event.pageIndex === 1 ? 10 : event.pageIndex, event.pageIndex === 1 ? event.pageSize : event.pageSize
      );
      console.log('ifs', this.viewData);
    } else {
      this.viewData = this.statementData.slice(
        ((event.pageSize * event.pageIndex) - event.pageSize), event.pageSize * event.pageIndex
      );
      console.log('else', this.viewData);
    }
  }

  getStatement() {
    this.statementService.getStatement('').then(i => {
      if (!!i && !!i.dados && !!i.dados.extrato) {
        this.items = i.dados.extrato.length;
        this.statementData = i.dados.extrato;

        // this.pages = parseInt(((i.dados.extrato.length / this.limit).toFixed(0)), 0);
        this.fakePaginate(
          {
            length: i.dados.extrato.length,
            pageIndex: 0,
            pageSize: 10,
            previousPageIndex: 1
          }
        );
      }
    });
  }
}
