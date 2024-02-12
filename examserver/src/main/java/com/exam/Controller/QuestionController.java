package com.exam.Controller;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;


    //add question

    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update Quiz

    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question)
    {
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }


    //get all question of any quiz

    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("qid") Long qid)
    {
//        Quiz quiz = new Quiz();
//        quiz.setQid(qid);
//        Set<Question> questionOfQuiz= this.questionService.getQuestionOfQuiz(quiz);
//        return ResponseEntity.ok(questionOfQuiz);

        Quiz quiz = this.quizService.getQuiz(qid);

        Set<Question> questions = quiz.getQuestions();

        List<Question> list = new ArrayList<>(questions);

        if(list.size() > Integer.parseInt(quiz.getNumberOfQuestion()))
        {
            list = list.subList(0,Integer.parseInt(quiz.getNumberOfQuestion()+1));

        }

        list.forEach((q) ->{
            q.setAnswer(" ");
        });
        Collections.shuffle(list);
        return ResponseEntity.ok(list);
    }



    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid)
    {
       Quiz quiz = new Quiz();
       quiz.setQid(qid);
       Set<Question> questionOfQuiz= this.questionService.getQuestionsOfQuiz(quiz);
       return ResponseEntity.ok(questionOfQuiz);

        //return ResponseEntity.ok(list);
    }



    //get single quiz

    @GetMapping("/{quesId}")
    public  Question question(@PathVariable("quesId") Long quesId)
    {
        return this.questionService.getQuestion(quesId);
    }

    //delete question

    @DeleteMapping("{quesId}")
    public void  delete(@PathVariable("quesId") Long quesId)
    {
        this.questionService.deleteQuestion(quesId);
    }

    //evaluating quiz

    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions)
    {
        System.out.println(questions);
        double marksGot = 0;
         int correctAnswers = 0;
         int  attempted = 0;
        for(Question q : questions){
            //single questions
          Question question = this.questionService.get(q.getQuesId());

          if(question.getAnswer().equals(q.getGivenAnswer()))
          {
              //correct
              correctAnswers ++ ;

              double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
              marksGot += marksSingle ;
          }

          if ( q.getGivenAnswer() !=null)
          {
              attempted ++ ;
          }

        }

        Map<String , Object> map = Map.of("marksGot" , marksGot , "correctAnswers" , correctAnswers,"attempted" , attempted);
        return ResponseEntity.ok(map);
    }
}
