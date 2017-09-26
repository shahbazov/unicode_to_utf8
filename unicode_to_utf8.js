/*
  
  1)
 http://www.fileformat.info/info/unicode/utf8.htm
         
 Binary format of bytes in sequence
 
               1st Byte    2nd Byte    3rd Byte    4th Byte    Number of Free Bits   Maximum Expressible Unicode Value
 pattern1  :   0xxxxxxx                                                7             007F hex (127)
 pattern2  :   110xxxxx    10xxxxxx                                (5+6)=11          07FF hex (2047)
 pattern3  :   1110xxxx    10xxxxxx    10xxxxxx                  (4+6+6)=16          FFFF hex (65535)
 pattern4  :   11110xxx    10xxxxxx    10xxxxxx    10xxxxxx    (3+6+6+6)=21          10FFFF hex (1,114,111)
         
         
         
 Example 1 : cyryllic  Ж
 
 a) 
 unicode of Ж is 1046

 b) 
 1046 is bigger than 0000 0111 1111 1111 = 0x07ff = 2047 

 c)
                                        5 bit      11 bit
                                        -----    -----------  
    1046    = 0000010000010110    -- >  00000    10000010110  
        (10)                  (2)

 1046 has 11 meaningfull bits 10000010110

 
 a,b,c point to utf8 pattern2
 
 so, all we need to do now is to acoomodate the 11 (5+6) bits of 1046 to utf8 2047 format 110xxxxx  10xxxxxx  

 lets go

     0011 0000 0000 0000  // 0x3000(hex) = 12288 (decimal) : this is first part (110xxxxx) of utf8 2047 format
+
(
     0000 0111 1100 0000  // 0x07c0 (hex) = 1984 (decimal) : boolean AND with 1984 take the first 5 bits of meaningfull 11 bits
&  
     0000 0100 0001 0110  (this is binary of Ж)
)
=
     0011 0100 0000 0000
<<=2                      (shift 2 bit to left)
     1101 0000 0000 0000

                          //at this point the first part is generated

+
     0000 0000 1000 0000  // 0x0080(hex) = 128 (decimal) : this is second part (10xxxxxx) of utf8 2047 format
+
(
     0000 0000 0011 1111  // 0x003f(hex) = 63 (decimal) : boolean AND with 63 take the rest 6 bits of meaningfull 11 bits
&
     0000 0100 0001 0110  (this is binary of Ж)
)
=
     1101 0000 1001 0110  // 0xd096  this is utf8 of Ж

 
 
 Example 2 : turkish Ö


   unicode(Ö) = 214    

   utf8  = 12288 + (214 & 1984);
   utf8 <<= 2;
   utf8 = utf8 + 128 + (214&63);

   result is 50070

   x=50070;
   
   x.toString(16)=c396
     
 */

function utf8(unicode){
  var utf8;
  if (unicode <= 127) {
     utf8 = unicode;
  } else if (unicode > 127 && unicode <= 2047) {
     utf8 = 12288 + (unicode & 1984);
     utf8 <<= 2;
     utf8 = utf8 + 128 + (63 & unicode);
  }  
  return utf8;
}


 




