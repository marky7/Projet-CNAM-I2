package com.tracability.rule;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Rule {
	 	private List<Condition> conditions;
	    private Rule.eventType eventType;

	    public List<Condition> getConditions() {
	        return conditions;
	    }

	    public void setConditions(List<Condition> conditions) {
	        this.conditions = conditions;
	    }

	    public Rule.eventType getEventType() {
	        return eventType;
	    }

	    public void setEventType(Rule.eventType eventType) {
	        this.eventType = eventType;
	    }

	    @Override
	    public String toString(){
	        StringBuilder statementBuilder = new StringBuilder();

	        for (Condition condition : getConditions()) {

	            String operator = null;

	            switch (condition.getOperator()) {
	                case EQUAL_TO:
	                    operator = "==";
	                    break;
	                case NOT_EQUAL_TO:
	                    operator = "!=";
	                    break;
	                case GREATER_THAN:
	                    operator = ">";
	                    break;
	                case LESS_THAN:
	                    operator = "<";
	                    break;
	                case GREATER_THAN_OR_EQUAL_TO:
	                    operator = ">=";
	                    break;
	                case LESS_THAN_OR_EQUAL_TO:
	                    operator = "<=";
	                    break;
	            }

	            statementBuilder.append(condition.getField()).append(" ").append(operator).append(" ");

	            if (condition.getValue() instanceof String) {
	                statementBuilder.append("'").append(condition.getValue()).append("'");
	            } else {
	                statementBuilder.append(condition.getValue());
	            }

	            statementBuilder.append(" && ");
	        }

	        String statement = statementBuilder.toString();

	        // remove trailing &&
	        return statement.substring(0, statement.length() - 4);
	    }

	    public static enum eventType {

	        DANGEROUSGAS(" DANGEROUSGAS"),
	        TEMPERATURES("TEMPERATURES");
	        private final String value;
	        private static Map<String, Rule.eventType> constants = new HashMap<String, Rule.eventType>();

	        static {
	            for (Rule.eventType c: values()) {
	                constants.put(c.value, c);
	            }
	        }

	        private eventType(String value) {
	            this.value = value;
	        }

	        public static Rule.eventType fromValue(String value) {
	            Rule.eventType constant = constants.get(value);
	            if (constant == null) {
	                throw new IllegalArgumentException(value);
	            } else {
	                return constant;
	            }
	        }

	    }

		public static List<Rule> getRulesFromProfileId(int i) {
			//Requete get sur rules 
			/*Création de la régle*/
			
			List<Rule> rule = new ArrayList<Rule>();
			Rule rule_1 = new Rule();
			Rule rule_2 = new Rule();
			rule.add(rule_1);
			rule.add(rule_2);
			int nb_rule = rule.size();
			int j;
			
			for(j=0;j< nb_rule;j++) {
				/*Pour chaque regle récupérer la liste des conditions */
				List<Condition> conditions = Condition.getConditionFromRuleID(123);
				
				rule.get(j).setConditions(conditions);
			}
		
			//
			return rule;
		}
}
