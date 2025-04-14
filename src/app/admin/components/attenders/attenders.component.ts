import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BallotService } from '../../services/ballot.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExcelReaderService } from '../../services/ultils/excelrender';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SubaccountService } from '../../services/subaccount.service';

interface AttenderData {
  id: number;
  hoTen:string;
  dienThoai:string;
  cmnd:string;
  khoaBM:string;
}

interface AttenderModel{
  id:number;
  idvande:number;
  idmainaccount:number;
  subAccountModels:any
}

interface Ballot{
  id:number;
  tenvd:string;
}

@Component({
  selector: 'app-attenders',
  standalone: false,
  templateUrl: './attenders.component.html',
  styleUrl: './attenders.component.scss'
})
export class AttendersComponent implements OnInit {
    displayedColumns: string[] = ['id', 'hoTen', 'dienThoai', 'cmnd', 'khoaBM','action'];
    dataSource!: MatTableDataSource<AttenderData>;
    arrayBallot!:Ballot[];
    attenderForm!:FormGroup;
    arrayAttender:AttenderData[] = [];
    excelData: any[] = [];
    _data:AttenderModel ={
      id:0,
      idvande: 0,
      idmainaccount: 0,
      subAccountModels: undefined
    };

    @ViewChild(MatPaginator) paginator!: MatPaginator ;
    @ViewChild(MatSort) sort!: MatSort ;
      
    constructor(private ballot:BallotService,private service:SubaccountService,private toastr:ToastrService,private builder:FormBuilder,private excelReaderService: ExcelReaderService){}
    ngOnInit(): void {
      this.ballot.GetVanDe('',1,20).subscribe({
        next:(res)=>{
          this.arrayBallot = res.map((item:any) =>({
            id:item.id,
            tenvd:item.tenVD
            })
          );
        },
        error:(err)=>{
          this.toastr.error(err?.error.message,"Thông báo")
        }
      })

      this.attenderForm = this.builder.group({
        id:this.builder.control(0),
        hoTen: this.builder.control(''),
        dienThoai: this.builder.control(''),
        cmnd: this.builder.control(''),
        khoaBM: this.builder.control(''),
        vande:this.builder.control(14),
        mainaccount:this.builder.control(1)
      })

      
    }

  AddAttender(){
    if(!this.attenderForm.invalid){
      let attender: AttenderData = { 
        id: this.attenderForm.value.id, 
        hoTen: this.attenderForm.value.hoTen,
        dienThoai: this.attenderForm.value.dienThoai,
        cmnd: this.attenderForm.value.cmnd,
        khoaBM: this.attenderForm.value.khoaBM
      };      
      this.arrayAttender.push(attender);
      this.dataSource = new MatTableDataSource(this.arrayAttender);
    }
  }
  
  changeBallot(){
    console.log(this.attenderForm.value.vande);
    this.service.GetSubAccount('',1,20,this.attenderForm.value.vande)
    .subscribe({
      next:(res)=>{
        console.log(res);
        
        this.dataSource = new MatTableDataSource(res); 
      },
      error(err) {
        console.log(err); 
      },
    })
    
  }
  
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.excelReaderService.readExcelFile(file)
        .then(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        .catch(error => console.error("Lỗi đọc file:", error));
    }
  }

  async Save(){
    this._data.id =0;
    this._data.idmainaccount= 1;
    this._data.idvande = this.attenderForm.value.vande;
    this._data.subAccountModels= this.dataSource.filteredData;

    this.service.ThemMoi(this._data).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error(err) {
        console.log(err);
        
      },
    })
  }
}
