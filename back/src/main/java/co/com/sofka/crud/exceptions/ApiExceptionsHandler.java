package co.com.sofka.crud.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class ApiExceptionsHandler
{
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<Map> itemNoEncontrado()
    {
        Map response = new HashMap();
        response.put("error", "Error! No existe el item con ese id");
        response.put("status_code", HttpStatus.BAD_REQUEST.value());

        return new ResponseEntity<Map>(response, HttpStatus.BAD_REQUEST);
    }
}
