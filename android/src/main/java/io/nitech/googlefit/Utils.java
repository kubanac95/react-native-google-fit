package io.nitech.googlefit;

import com.facebook.react.bridge.ReadableArray;
import com.google.android.gms.common.api.Scope;

import androidx.annotation.NonNull;

public class Utils {
    static String scopesToString(ReadableArray scopes) {
        StringBuilder sb = new StringBuilder("oauth2:");
        for (int i = 0; i < scopes.size(); i++) {
            sb.append(scopes.getString(i)).append(" ");
        }
        return sb.toString().trim();
    }

    @NonNull
    static Scope[] createScopesArray(ReadableArray scopes) {
        int size = scopes.size();
        Scope[] _scopes = new Scope[size];

        for (int i = 0; i < size; i++) {
            String scopeName = scopes.getString(i);
            _scopes[i] = new Scope(scopeName);
        }
        return _scopes;
    }
}
