/* 
* Example functions to practice Javascipt
* Rebeca Davila
* 2025 - 02 - 12
*/

"use strict";

//Funciones
export function firstNonRepeating(texto){
    let count = 0;
    for (let i=0; i<texto.length; i++) {
        count = 0;
        for(let j=0; j<texto.length; j++){
            if (texto[i] == texto[j]){
                count = count + 1;
            }
        }
        if(count == 1){
            return texto[i];
        }
    }
}

export function bubbleSort(listNum){
    let n = listNum.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (listNum[j] > listNum[j + 1]) {
                [listNum[j], listNum[j + 1]] = [listNum[j + 1], listNum[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }

    return listNum;
}

export function invertArray(listNum) {
    let newList = [];
    let num = listNum.length * -1;
    for (let i=-1; i>=num; i--) {
        newList.push(listNum.at(i));
    }
    return newList;
}

export function invertArrayInplace(listNum) {
    let left = 0;
    let right = listNum.length - 1;

    while(left < right){
        let temp = listNum[left];
        listNum[left] = listNum[right];
        listNum[right] = temp;
        left ++;
        right --;
    }
}

export function capitalize(palabra){
    let result = "";
    let capitalizeNext = true;

    for (let i = 0; i < palabra.length; i++) {
        let char = palabra[i];

        if (capitalizeNext) {
            result += char.toUpperCase();
            capitalizeNext = false;
        } else {
            result += char;
        }

        if (char == " ") {
            capitalizeNext = true;
        }
    }

    return result;
}

export function mcd(num1, num2){
    console.log("El mcd de " + num1 + " y " + num2 + " es:");
    while(num2 !== 0){
        let temp = num2;
        num2 = num1 % num2;
        num1 = temp;
    }

    return num1;
}

export function hackerSpeak(palabra){
    let remplazo = {
        'a': '4',
        'e': '3',
        'i': '1',
        'o': '0',
        's': '5'
    };

    let result = "";

    for (let char of palabra) {
        if (char in remplazo) {
            result += remplazo[char];
        } else {
            result += char; 
        }
    }

    return result;
}

export function factorize(num){
    let newlist = [];
    let i = 1;
    let result = 0;

    while (i <= num){
        result = num / i;
        if (Number.isInteger(result)){
            newlist.push(i);
        }
        i++;
    }

    return newlist;
}

export function deduplicate(doublenum){
    let newlist = [...new Set(doublenum)];
    return newlist;
}

export function findShortestString(stringlist){
    let shortestString = stringlist[0];
    let longitud = 0;

    for (let i=1; i<stringlist.length; i++) {
        if (shortestString.length >= stringlist[i].length){
            shortestString = stringlist[i];
            longitud = shortestString.length;
        }
    }

    return longitud;
}

export function isPalindrome(palabra){
    for (let i = 0; i < palabra.length / 2; i++) {
        if(palabra[i] !== palabra[palabra.length - 1 - i]){
            return false;
        }
        
    }
    return true;
}

export function sortStrings(lista){
    return lista.slice().sort();
}

export function stats(listNum){
    let MedianaYModa = [];

    if (listNum.length == 0){
        return [0, 0];
    }

    //Media
    let temp = 0;
    for (let i=0; i<listNum.length; i++) {
        temp += listNum[i];
    }
    temp = temp/listNum.length;

    MedianaYModa.push(temp);

    //Moda
    let frequency = {};
    let max = 0;
    let result = 0;

    for (let i = 0; i < listNum.length; i++) {
        if (frequency[listNum[i]] === undefined) {
            frequency[listNum[i]] = 1;
        } else {
            frequency[listNum[i]] += 1;
        }
    
        if (frequency[listNum[i]] > max) {
            max = frequency[listNum[i]];
            result = listNum[i];
        }
    }

    MedianaYModa.push(result);

    return MedianaYModa;

}

export function popularString(listOfText){
    let frequency = {};
    let max = 0;
    let result = "";

    for (let i = 0; i < listOfText.length; i++) {
        if (frequency[listOfText[i]] === undefined) {
            frequency[listOfText[i]] = 1;
        } else {
            frequency[listOfText[i]] += 1;
        }
    
        if (frequency[listOfText[i]] > max) {
            max = frequency[listOfText[i]];
            result = listOfText[i];
        }
    }

    return result;
}

export function isPowerOf2(n){
    if (n > 0 && (n & (n - 1)) == 0){
        return true;
    } else {
        return false;
    }
}

export function sortDescending(listNum){
    bubbleSort(listNum);
    let newList = invertArray(listNum);
    return newList;
}