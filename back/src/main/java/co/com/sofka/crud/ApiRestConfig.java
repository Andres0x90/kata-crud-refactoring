package co.com.sofka.crud;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootConfiguration
public class ApiRestConfig {
    @Bean
    public ModelMapper getMapper()
    {
        return new ModelMapper();
    }
}
