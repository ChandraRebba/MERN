package main
 import "fmt"

 func main(){
 	x:=0
 	changeVal(x)
 	fmt.Println("x=",x)

 	changeXVal(&x)
 	fmt.Println("x=",x)

 	fmt.Println("Mem Address for x=",&x)
 }

 func changeVal(x int){

 	x = 2
 }

  func changeXVal(x *int){

 	*x = 2
 }
