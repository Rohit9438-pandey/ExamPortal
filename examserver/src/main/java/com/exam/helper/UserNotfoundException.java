package com.exam.helper;

public class UserNotfoundException extends  Exception
{
    public  UserNotfoundException()
    {
        super("User with this username not found in database !!");
    }

    public UserNotfoundException(String msg)
    {
        super(msg);
    }
}
