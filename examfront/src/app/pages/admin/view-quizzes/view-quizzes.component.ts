import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{


  quizzes = [
    {
      qid: '',
      title:'',
      description:'',
      maxMarks: '',
      numberOfQuestion: '',
      active: '',
      category:{
        title: '',
        description: '',
    
      },
    },

  ];



  constructor(private _quiz:QuizService){}

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      
      (data:any)=>{
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error ! ' ,"Error in loading data !" ,'error');
      });
    
  }

  //delete quiz

  deleteQuiz(qid: any)
  {
    
    Swal.fire({
      icon:'info',
      'title':"Are you sure ? ",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{

      if(result.isConfirmed)
      {
        this._quiz.deleteQuiz(qid).subscribe(
          (data)=>{
           this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!= qid);
    
            Swal.fire('Success !! ' ,'Quiz Deleted' ,'success');
          },
          (error) =>
          {
            Swal.fire('Error !! ' ,'error in Deleting quiz' ,'error');
          }
          
          );
      }

    });

  }

}
